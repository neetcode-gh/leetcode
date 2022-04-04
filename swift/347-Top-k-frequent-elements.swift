class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        var count = [Int:Int]()
        for n in nums {
            guard count[n] != nil else {
                count[n] = 1
                continue
            }
            count[n] = 1 + count[n]!
        }
        
        var freq = [[Int]](repeating: [], count: nums.count+1)
        for (n, c) in count {
            freq[c].append(n)
        }
        
        var res = [Int]()
        for i in stride(from: freq.count-1, to: 0, by: -1) {
            for n in freq[i] {
                res.append(n)
                if res.count == k {
                    return res
                }
            }
        }
        return res
    }
}
