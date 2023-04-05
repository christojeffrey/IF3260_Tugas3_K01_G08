class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // flatten method
    flatten() {
        return [this.x, this.y, this.z];
    }

    export() {
        return [this.x, this.y, this.z];
    }
    import(array) {
        this.x = array[0];
        this.y = array[1];
        this.z = array[2];
    }
}

export { Point };   