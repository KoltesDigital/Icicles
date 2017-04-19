
void main ()
{
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
}