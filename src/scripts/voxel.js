
public class Voxel 
{
	public int index;
	public Vector3 position;
	public Vector3 normal;
	public Color color;

	public Voxel (int index_, Vector3 position_, Vector3 normal_, Color color_)
	{
		index = index_;
		position = position_;
		normal = normal_;
		color = color_;
	}
}

public static class Voxelize
{
	public static List<Voxel> ParseVertices (Mesh mesh, Texture2D texture, float densityScale = 1f)
	{
		List<Voxel> voxelList = new List<Voxel>();
		Vector3[] vertices = mesh.vertices;
		Vector3[] normals = mesh.normals;
		Vector2[] uvs = mesh.uv;
		int[] triangles = mesh.triangles;
		int range = 128;

		int[][] grid = new int[8][];
		for (int i = 0; i < 8; ++i) {
			grid[i] = new int[range * range * range];
		}


		// triangles
		for (int t = 0; t < triangles.Length - 2; t += 3)
		{
			int iA = triangles[t];
			int iB = triangles[t + 1];
			int iC = triangles[t + 2];
			Vector3 a = vertices[iA] * densityScale;
			Vector3 b = vertices[iB] * densityScale;
			Vector3 c = vertices[iC] * densityScale;
			// Vector3 normal = Vector3.Normalize(Vector3.Cross(b - a, c - a));
			Vector3 min = Vector3.Min(Vector3.Min(a, b), c);
			Vector3 max = Vector3.Max(Vector3.Max(a, b), c);
			if (Mathf.Abs(max.x - min.x) < 1f) { max.x += 1f; }
			if (Mathf.Abs(max.y - min.y) < 1f) { max.y += 1f; }
			if (Mathf.Abs(max.z - min.z) < 1f) { max.z += 1f; }
			Vector3 size = new Vector3(Mathf.Abs(max.x - min.x), Mathf.Abs(max.y - min.y), Mathf.Abs(max.z - min.z));

			// For each voxel in bounds
			int gridCount = (int)(size.x * size.y * size.z);
			for (int v = 0; v < gridCount; ++v)
			{
				// Position in triangle grid
				float x = v % size.x;
				float y = Mathf.Floor( v / (size.x * size.z )) % size.y;
				float z = Mathf.Floor( v / size.x ) % size.z;
				Vector3 gridPosition = new Vector3(min.x + x, min.y + y, min.z + z);

				// Unique ID by position
				int voxelIndex = (int)Mathf.Floor(
					Mathf.Abs(gridPosition.x) % range
					+ Mathf.Abs(gridPosition.z) * range
					+ Mathf.Abs(gridPosition.y) * range * range);
				
        int gridIndex = 0;
				if(gridPosition.x >= 0) { gridIndex |= 4; }
				if(gridPosition.y >= 0) { gridIndex |= 2; }
				if(gridPosition.z >= 0) { gridIndex |= 1; }
				
				if (voxelIndex < range * range * range) {
					int voxel = grid[gridIndex][voxelIndex];
					if (voxel == 0)
					{
						// Intersection test
						Vector3 voxelBoundsCenter = gridPosition + Vector3.one * 0.5f;
						Vector3 voxelBoundsDimension = Vector3.one * 0.5f;
						if (0 != Utils.TriBoxOverlap(voxelBoundsCenter, voxelBoundsDimension, a, b, c))
						{
							// Define the position (no duplicate)
							grid[gridIndex][voxelIndex] = 1;

							// Vector3 aG = a - gridPosition;
							// Vector3 bG = b - gridPosition;
							// Vector3 cG = c - gridPosition;
							// Vector3 vABC = Vector3.Cross(a - b, a - c);
							// Vector3 vA = Vector3.Cross(bG, cG);
							// Vector3 vB = Vector3.Cross(cG, aG);
							// Vector3 vC = Vector3.Cross(aG, bG);
							// float areaTotal = vABC.magnitude;
							// float areaA = vA.magnitude / areaTotal * Mathf.Sin(Vector3.Dot(vABC, vA));
							// float areaB = vB.magnitude / areaTotal * Mathf.Sin(Vector3.Dot(vABC, vB));
							// float areaC = vC.magnitude / areaTotal * Mathf.Sin(Vector3.Dot(vABC, vC));
							Vector3 g = voxelBoundsCenter;
							float areaTotal = Utils.TriangleArea(a, b, c);
							float areaA = Utils.TriangleArea(g, b, c) / areaTotal;
							float areaB = Utils.TriangleArea(a, g, c) / areaTotal;
							float areaC = Utils.TriangleArea(a, b, g) / areaTotal;

							Vector2 uv = Vector2.zero;
							uv = uvs[iA];// * areaA;// + uvs[iB] * areaB + uvs[iC] * areaC;
							// uv = Vector2.Lerp(uv, uvs[iA], areaA);
							// uv = Vector2.Lerp(uv, uvs[iB], areaB);
							// uv = Vector2.Lerp(uv, uvs[iC], areaC);

							Color color = texture.GetPixelBilinear(uv.x, uv.y);
							// Color color = new Color(areaA, areaB, areaC);
							// Color color = new Color(uv.x, uv.y, 0);

							Vector3 normal = Vector3.zero;
							normal = normals[iA] * areaA + normals[iB] * areaB + normals[iC] * areaC;
							// normal = Vector3.Lerp(normal, normals[iA], areaA);
							// normal = Vector3.Lerp(normal, normals[iB], areaB);
							// normal = Vector3.Lerp(normal, normals[iC], areaC);

							voxelList.Add(new Voxel(voxelIndex, gridPosition / densityScale, normal.normalized, color));
						}
					}
				}
			}
		}
		return voxelList;
	}
}