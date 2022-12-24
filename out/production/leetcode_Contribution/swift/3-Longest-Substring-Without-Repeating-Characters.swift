class Solution {
    func lengthOfLongestSubstring(_ s: String) -> Int {
        guard s.count > 0 else { return 0 }
        let list = Array(s)
        var hs = Set<Character>()
        var l = 0
        var r = 0
        var mv = 0
        for r in 0..<s.count {
            while hs.contains(list[r]) {
                hs.remove(list[l])
                l += 1
            }
            hs.insert(list[r])
            mv = max(mv, r - l + 1)
        }
        return mv
    }
}
