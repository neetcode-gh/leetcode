class Solution {
    func findItinerary(_ tickets: [[String]]) -> [String] {
        var adj: [String: [String]] = [:]
        for t in tickets {
            let (src, dst) = (t[0], t[1])
            adj[src, default: []].append(dst)
        }

        for src in adj.keys {
            adj[src]?.sort { $0 > $1 }
        }

        var res = [String]()
        func dfs(_ src: String) {
            while let dst = adj[src]?.popLast() {
                dfs(dst)
            }
            res.append(src)
        }

        dfs("JFK")
        return res.reversed()
    }
}