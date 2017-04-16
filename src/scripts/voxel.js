
function Voxel (index, position, normal, color)
{
	this.index = index;
	this.position = position;
	this.normal = normal;
	this.color = color;
}

function voxelize (geometry, texture, scale)
{
	scale = scale || 1;
	var attributes = {
		position: { array: [] },
		normal: { array: [] },
		uv: { array: [] },
		color: { array: [] },
	}
	var voxelList = [];
	var vertices = geometry.attributes.position.array;
	var normals = geometry.attributes.normal.array;
	var uvs = geometry.attributes.uv.array;
	console.log(geometry);
	var range = 512;
	var triangleCount = vertices.length / 6;
	var grid = [[],[],[],[],[],[],[],[]];

	for (var tri = 0; tri < triangleCount; ++tri) {
		var iax = tri*9;
		var iay = tri*9+1;
		var iaz = tri*9+2;
		var ibx = tri*9+3;
		var iby = tri*9+4;
		var ibz = tri*9+5;
		var icx = tri*9+6;
		var icy = tri*9+7;
		var icz = tri*9+8;
		var a = (new THREE.Vector3(vertices[iax],vertices[iay],vertices[iaz])).multiplyScalar(scale);
		var b = (new THREE.Vector3(vertices[ibx],vertices[iby],vertices[ibz])).multiplyScalar(scale);
		var c = (new THREE.Vector3(vertices[icx],vertices[icy],vertices[icz])).multiplyScalar(scale);
		var min = (new THREE.Vector3(a.x, a.y, a.z)).min(b).min(c);
		var max = (new THREE.Vector3(a.x, a.y, a.z)).max(b).max(c);
		if (Math.abs(max.x-min.x)<1) max.x+=1;
		if (Math.abs(max.y-min.y)<1) max.y+=1;
		if (Math.abs(max.z-min.z)<1) max.z+=1;
		var size = new THREE.Vector3(Math.abs(max.x-min.x),Math.abs(max.y-min.y),Math.abs(max.z-min.z));
		var gridCount = Math.ceil(size.x*size.y*size.z);
		for (var vox = 0; vox < gridCount; ++vox) {
			var x = vox % size.x;
			var y = Math.floor(vox/(size.x*size.z)) % size.y;
			var z = Math.floor(vox/size.x) % size.z;
			var gridPosition = new THREE.Vector3(min.x+x, min.y+y, min.z+z);
			var voxelIndex = Math.floor(Math.abs(gridPosition.x)%range+Math.abs(gridPosition.y)*range+Math.abs(gridPosition.z)*range*range);
			var gridIndex = 0;
			if (gridPosition.x>=0) gridIndex |= 4;
			if (gridPosition.y>=0) gridIndex |= 2;
			if (gridPosition.z>=0) gridIndex |= 1;
			if (voxelIndex < range*range*range) {
				var voxel = grid[gridIndex][voxelIndex];
				if (voxel == undefined) {
					var voxelBoundsCenter = gridPosition.add(new THREE.Vector3(0.5,0.5,0.5));
					var voxelBoundsDimension = new THREE.Vector3(0.5,0.5,0.5);
					if (triBoxOverlap(voxelBoundsCenter, voxelBoundsDimension, a, b, c) != 0) {
						grid[gridIndex][voxelIndex] = 1;
						var areaTotal = triangleArea(a, b, c);
						var areaA = triangleArea(voxelBoundsCenter, b, c) / areaTotal;
						var areaB = triangleArea(a, voxelBoundsCenter, c) / areaTotal;
						var areaC = triangleArea(a, b, voxelBoundsCenter) / areaTotal;
						var uvAX = uvs[tri*6]; var uvAY = uvs[tri*6+1];
						var uvBX = uvs[tri*6+2]; var uvBY = uvs[tri*6+3];
						var uvCX = uvs[tri*6+4]; var uvCY = uvs[tri*6+5];
						// var uvX = (uvAX*areaA + uvBX*areaB + uvCX*areaC)/3;
						// var uvY = (uvAY*areaA + uvBY*areaB + uvCY*areaC)/3;
						var uvX = lerp(lerp(uvAX, uvBX, areaB), uvCX, areaC);
						var uvY = lerp(lerp(uvAY, uvBY, areaB), uvCY, areaC);
						// voxelList.push(new Voxel(voxelIndex, gridPosition.multiplyScalar(scale), new THREE.Vector3(0,1,0), new THREE.Color(255,0,0)));
						var position = new THREE.Vector3(gridPosition.x, gridPosition.y, gridPosition.z);
						position.divideScalar(scale);
						attributes.position.array.push(position.x, position.y, position.z);
						// attributes.uv.array.push(uvs[tri*6],uvs[tri*6+1]);
						attributes.uv.array.push(uvX, uvY);
						attributes.normal.array.push(0, 1, 0);
						attributes.color.array.push(1,1,1);
					}
				}
			}
		}
	}
	return attributes;
}