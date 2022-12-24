class Solution {
    func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {
        let total = piles.reduce(0, +)
        var left = (total + h - 1) / h, right = piles.max()!
        
        while left < right {
            let mid = left + (right - left) / 2
            
            var totalTime = 0
            for p in piles {
                totalTime += (p + mid - 1) / mid
            }
            
            if totalTime <= h {
                right = mid
            }
            else {
                left = mid + 1
            }
        }
        return right
    }
}