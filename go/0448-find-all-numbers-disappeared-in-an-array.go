func findDisappearedNumbers(nums []int) []int {
    for _, n := range nums {
        i := abs(n) - 1
        nums[i] = -1 * abs(nums[i])
    }
    
    var res []int
    for i, n := range nums {
        if n > 0 {
            res = append(res, i + 1)
        }
    }
    return res
}

func abs(n int) int {
    if n < 0 {
        return n * -1
    }
    return n
}
