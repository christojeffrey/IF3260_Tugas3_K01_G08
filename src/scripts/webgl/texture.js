import { isPowerOf2 } from "../math/math.js";

function createTexture(gl) {
    // Create a buffer to put textures in
    let textures = [ImageTexture(), BumpMapTexture(), EnviromentTexture()]

    console.log("textures", gl.getParameter(gl.TEXTURE0));

    function ImageTexture() {

        return Load2DTexture("../assets/textures/tree.jpg", 0);
    }

    function BumpMapTexture() {

        return Load2DTexture("../assets/textures/bump_normal.png", 1);
    }

    function EnviromentTexture() {
        let texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE2);
        
        console.log("texture", gl.getParameter(gl.ACTIVE_TEXTURE));
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        var faceinfo = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                imageUrl: "../assets/textures/pos-x.jpg"
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                imageUrl: "../assets/textures/neg-x.jpg"
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                imageUrl: "../assets/textures/pos-y.jpg"
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                imageUrl: "../assets/textures/neg-y.jpg"
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                imageUrl: "../assets/textures/pos-z.jpg"
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                imageUrl: "../assets/textures/neg-z.jpg"
            }
        ];

        faceinfo.forEach((face) => {
            let { target, imageUrl } = face;
            
            var level           = 0;
            var internalFormat  = gl.RGBA;
            var width           = 512;
            var height          = 512;
            var border          = 0;
            var srcFormat       = gl.RGBA;
            var srcType         = gl.UNSIGNED_BYTE;

            gl.texImage2D(target, level, internalFormat, width, height, border, srcFormat, srcType, null);

            var image = new Image();
            image.src = imageUrl;
            image.crossOrigin = "";
            image.addEventListener('load', () => {

                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, srcFormat, srcType, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            });
        });

        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        return texture;
    }

    function Load2DTexture(url, i) {
        let texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + i);
        console.log("texture", gl.getParameter(gl.ACTIVE_TEXTURE));
        gl.bindTexture(gl.TEXTURE_2D, texture);

        var target          = gl.TEXTURE_2D;
        var level           = 0;
        var internalFormat  = gl.RGBA;
        var width           = 1;
        var height          = 1;
        var border          = 0;
        var srcFormat       = gl.RGBA;
        var srcType         = gl.UNSIGNED_BYTE;
        var pixel           = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(target, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        // Asynchronously load an image
        var image = new Image();
        image.src = url; 
        image.crossOrigin = ""; 
        image.addEventListener('load', () => {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, texture);

            var target         = gl.TEXTURE_2D;
            var level          = 0;
            var internalFormat = gl.RGBA;
            var srcFormat      = gl.RGBA;
            var srcType        = gl.UNSIGNED_BYTE;
            gl.texImage2D(target, level, internalFormat, srcFormat, srcType, image);
            console.log("image", image);
            // Check if the image is a power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                console.log("image power of 2")
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                console.log("image not power of 2");
                // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        });

        return texture;
    }

    return textures;
}

export { createTexture }