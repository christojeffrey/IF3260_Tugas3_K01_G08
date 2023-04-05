export const cs = {
    width  :      800,
    height :      600,
    depth  :     1000,

    set: function (width, height, depth) {
        cs.width  = width;
        cs.height = height;
        cs.depth  = depth;
    },
    get: function () {
        return {
            width  :  cs.width,
            height :  cs.height,
            depth  :  cs.depth
        }
    }
}