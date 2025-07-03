/*
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/detect-squares
 */
class DetectSquares {
    constructor () {
        this.map = {};   /* Space O(N) */
        this.points = [];/* Space O(N) */
    }
    
    add (point, { map, points } = this) {
        const [ x, y ] = point;
        const key = this.getKey(x, y);
        const value = ((map[key] || 0) + 1);

        map[key] = value;  /* Space O(N) */
        points.push(point);/* Space O(N) */
    }

    count (point, { points } = this, score = 0) {
        const [ x1, y1 ] = point;

        for (const [ x2, y2 ] of points) {/* Time O(N) */
            const isSame = (Math.abs(x2 - x1) === Math.abs(y2 - y1));
            const isEqual = ((x1 === x2) || (y1 === y2));
            const canSkip = (!isSame || isEqual);
            if (canSkip) continue;

            score += this.getScore(x1, y1, x2, y2);
        }

        return score;
    };

    getKey (x, y) {
        return `${x},${y}`;
    }

    getScore (x1, y1, x2, y2, { map } = this) {
        const [ aKey, bKey ] = [ this.getKey(x1, y2), this.getKey(x2, y1) ];
        const [ aScore, bScore ] = [ (map[aKey] || 0), (map[bKey] || 0) ];
    
        return (aScore * bScore);
    }
};

/** 
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */