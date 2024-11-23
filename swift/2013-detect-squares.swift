
class DetectSquares {

    var pts = [[Int]]()
    var ptsCount = [[Int]: Int]()

    init() {
        
    }
    
    func add(_ point: [Int]) {
        ptsCount[point, default: 0] += 1
        pts.append(point)
    }
    
    func count(_ point: [Int]) -> Int {
        var res = 0
        var x = point[0], y = point[1]
        for val in pts {
            let px = val[0], py = val[1]
            if abs(py - y) != abs(px - x) || x == px || y == py {
                continue
            }
            res += ptsCount[[x, py], default: 0] * ptsCount[[px, y], default: 0]
        }
        return res
    }
}

/**
 * Your DetectSquares object will be instantiated and called as such:
 * let obj = DetectSquares()
 * obj.add(point)
 * let ret_2: Int = obj.count(point)
 */