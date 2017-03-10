
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;
uniform float u_time;

uniform vec4 u_lightColor;
uniform vec4 u_ambient;
uniform sampler2D u_diffuse;
uniform sampler2D u_groundTexture;
uniform vec4 u_specular;

uniform sampler2D u_frameBuffer;
uniform sampler2D u_textTexture;
uniform sampler2D u_frameBackground;