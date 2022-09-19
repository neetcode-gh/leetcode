var DetectSquares = function () {
    this.ptsCount = {};
    this.pts = [];
};

/**
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function (point) {
    var str = point[0] + ',' + point[1];
    if (!this.ptsCount[str]) {
        this.ptsCount[str] = 0;
    }

    this.ptsCount[str]++;
    this.pts.push(point);
};

/**
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function (point) {
    var res = 0;
    var [x, y] = point;
    for (var [px, py] of this.pts) {
        if (Math.abs(px - x) !== Math.abs(py - y) || x === px || y === py) {
            continue;
        }

        res += (this.ptsCount[[x, py]] || 0) * (this.ptsCount[[px, y]] || 0);
    }

    return res;
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */
