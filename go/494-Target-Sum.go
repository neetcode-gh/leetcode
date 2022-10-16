func findTargetSumWays(nums []int, target int) int {
    return findSum(nums, 0, target,  make(map[string]int))
}

func findSum(nums []int, idx int, target int, memo map[string]int) int {
    key := fmt.Sprint(idx)+"*"+fmt.Sprint(target)
    
    if val, ok := memo[key]; ok {
        return val
    }
    
    if idx == len(nums) {
        if target == 0 {
            return 1
        }
        
        return 0
    }
    
    res := findSum(nums, idx+1, target+nums[idx], memo) + findSum(nums, idx+1, target-nums[idx], memo)
    
    memo[key] = res
    
    return res
}