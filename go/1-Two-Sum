func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i := 0; i < len(nums); i++ {
        _, val := m[nums[i]]
        if val {
            return []int{m[nums[i]], i}
        }
        m[target - nums[i]] = i        
    }
    return []int{0,0}
}
