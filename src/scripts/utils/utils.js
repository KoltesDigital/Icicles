

function rotateX (v, t)
{
	var cost = Math.cos(t); var sint = Math.sin(t);
	return [v[0], v[1] * cost - v[2] * sint, v[1] * sint + v[2] * cost];
}

function rotateY (v, t)
{
	var cost = Math.cos(t); var sint = Math.sin(t);
	return [v[0] * cost + v[2] * sint, v[1], -v[0] * sint + v[2] * cost];
}

function rotateZ (p, angle)
{
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	return [c*p[0]+s*p[1], -s*p[0]+c*p[1], p[2]];
}