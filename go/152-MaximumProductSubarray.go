func maxProduct(nums []int) int {
    tmpMin, tmpMax, ans := nums[0], nums[0], nums[0]

    for i := 1; i < len(nums);i++{
        tmpMin, tmpMax =
            min(nums[i], min(nums[i]*tmpMax, nums[i]*tmpMin)),
            max(nums[i], max(nums[i]*tmpMax, nums[i]*tmpMin))
        ans = max(ans, tmpMax)
    }
    

    return ans
}

func max(a,b int)int{
    if a < b{
        return b
    }
    
    return a
}

func min(a,b int)int{
    if a > b{
        return b
    }
    
    return a
}