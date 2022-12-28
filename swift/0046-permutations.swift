class Solution {
    var ans: [[Int]] = []
    
    func permute(_ nums: [Int]) -> [[Int]] {
        var referenceNums = nums
        dfs(start: 0, currentOrder: &referenceNums)
        return ans
    }
}

private extension Solution {
    private func swap(_ arr: inout [Int], at i1: Int, with i2: Int) {
        guard 
            i1 < arr.count,
            i2 < arr.count
        else { return }
        
        let temp = arr[i1]
        arr[i1] = arr[i2]
        arr[i2] = temp
    }
    
    func dfs(start: Int, currentOrder nums: inout [Int]) {
        // base case [take into final answer]
        if start == nums.count { 
            ans.append(nums)
            return 
        }
        
        // for each idx, take, switch with start, backtrack, switch back
        for i in start..<nums.count {
            // choose i.e. take it
            swap(&nums, at: i, with: start)
            
            // backtrack (from next idx)
            dfs(start: start + 1, currentOrder: &nums)
            
            // unchoose i.e. remove it
            swap(&nums, at: start, with: i)
        }
    }
}