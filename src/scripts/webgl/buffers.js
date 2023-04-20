function initBuffers(gl, positions, colors, normals, textureCoord, tangents, bitangents) {
    const positionBuffer         = initPositionBuffer(gl, positions);
    const colorBuffer            = initColorBuffer(gl, colors);
    const normalBuffer           = initNormalBuffer(gl, normals);
    const textureCoordBuffer     = initTextureCoordBuffer(gl, textureCoord);
    const tangentBuffer          = initTangetBuffer(gl, tangents);
    const bitangentBuffer        = initBitangentBuffer(gl, bitangents);

    function initPositionBuffer(gl, positions) {
        // Create a buffer to put positions in
        const positionBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
        return positionBuffer;
    }
      
    function initColorBuffer(gl, colors) {
        // Create a buffer to put colors in
        const colorBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
    
        return colorBuffer;
    }

    function initNormalBuffer(gl, normals) {
        // Create a buffer to put normals in
        const normalBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = normalBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    
        return normalBuffer;
    }

    function initTextureCoordBuffer(gl, textureCoord) {
        // Create a buffer to put texture coordinates in
        // console.log("textureCoordinate", textureCoord);
        const textureCoordBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = textureCoordBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);
    
        return textureCoordBuffer;
    }

    function initTangetBuffer(gl, tangents) {
        // Create a buffer to put tangents in
        const tangentBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = tangentBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tangents), gl.STATIC_DRAW);
    
        return tangentBuffer;
    }

    function initBitangentBuffer(gl, bitangents) {
        // Create a buffer to put bitangents in
        const bitangentBuffer = gl.createBuffer();
    
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = bitangentBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
    
        // Put geometry data into buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bitangents), gl.STATIC_DRAW);
    
        return bitangentBuffer;
    }

    return {
        positionBuffer          : positionBuffer,
        colorBuffer             : colorBuffer,
        normalBuffer            : normalBuffer,
        textureCoordBuffer      : textureCoordBuffer,
        tangentBuffer           : tangentBuffer,
        bitangentBuffer         : bitangentBuffer
    };
}

// unbind and clear
function unbindBuffers(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    // gl.bindTexture(gl.TEXTURE_2D, null);
}

export { initBuffers, unbindBuffers };
