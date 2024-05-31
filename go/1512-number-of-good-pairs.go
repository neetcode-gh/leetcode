func numIdenticalPairs(nums []int) int {
    pairs := 0

    for i := 0; i < len(nums); i++ {
        for j := i+1; j < len(nums); j++ {
            if nums[i] == nums[j] {
                pairs++
            }
        }
    }

    return pairs
}

