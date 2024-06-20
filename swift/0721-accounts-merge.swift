/**
 * Question Link: https://leetcode.com/problems/accounts-merge/
 */

 class UnionFind {
    var parents = [Int: Int]()
    var ranks = [Int: Int]()

    init(n: Int) {
        for i in 0..<n + 1 {
            parents[i] = i
            ranks[i] = 0
        }
    }

    func find(n: Int) -> Int {
        var p = parents[n]!
        while p != parents[p] {
            parents[p] = parents[parents[p]!]
            p = parents[p]!
        }
        return p
    }

    func union(n1: Int, n2: Int) -> Bool {
        let p1 = find(n: n1)
        let p2 = find(n: n2)
        if p1 == p2 {
            return false
        }
        if ranks[p1]! > ranks[p2]! {
            parents[p2] = p1
        } else if ranks[p1]! < ranks[p2]! {
            parents[p1] = p2
        } else {
            parents[p1] = p2
            ranks[p2, default: 0] += 1
        }
        return true
    }
}

class Solution {
    func accountsMerge(_ accounts: [[String]]) -> [[String]] {
        let unionFind = UnionFind(n: accounts.count)
        var emailToAcc = [String: Int]()
        for (i, a) in accounts.enumerated() {
            for j in 1..<a.count {
                if let index = emailToAcc[a[j]] {
                    unionFind.union(n1: i, n2: index)
                } else {
                    emailToAcc[a[j]] = i
                }
            }
        }
        var emailGroup = [Int: [String]]()
        for (e, i) in emailToAcc {
            let leader = unionFind.find(n: i)
            emailGroup[leader, default: []].append(e)
        }
        var res = [[String]]()
        for (i, emails) in emailGroup {
            let name = accounts[i][0]
            res.append([name] + emails.sorted())
        }
        return res
    }
}