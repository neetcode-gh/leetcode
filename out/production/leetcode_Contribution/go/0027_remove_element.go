func removeElement(nums []int, val int) int {
    var k int = 0 
    for i := 0; i < len(nums); i++ {
        if nums[i] != val {
            nums[k] = nums[i] 
            k += 1 
        }
    }
    return k
}
