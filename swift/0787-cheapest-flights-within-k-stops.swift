class Solution {
    func findCheapestPrice(_ n: Int, _ flights: [[Int]], _ src: Int, _ dst: Int, _ k: Int) -> Int {
        var prices = Array(repeating: Int.max, count: n)
        prices[src] = 0

        for i in 0..<(k + 1) {
            var tmp = prices

            for f in flights {
                let (s, d, p) = (f[0], f[1], f[2])
                if prices[s] == Int.max {
                    continue
                }
                if prices[s] + p < tmp[d] {
                    tmp[d] = prices[s] + p
                }
            }

            prices = tmp
        }

        return prices[dst] == Int.max ? -1 : prices[dst]
    }
}