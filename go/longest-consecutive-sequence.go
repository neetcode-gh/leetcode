func longestConsecutive(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    sort.Ints(nums)
    c, maxc:=1,1
    for i := 0; i < len(nums)-1;i++ {
        fmt.Println(i)
        if nums[i+1] - nums[i] == 1{
            c++
            continue
        } else if (nums[i+1] - nums[i]) == 0 {
            continue
        } else {
            if c > maxc {
                maxc = c
            }
            c = 1
        }
    }
    if c > maxc {
        return c
    }
    return maxc
}
