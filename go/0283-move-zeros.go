func moveZeroes(nums []int)  {
    length := 0
    for _, n := range nums {
        if n != 0{
            nums[length] = n
            length += 1
        }
    }
    
    for i := length; i < len(nums); i++ {
        nums[i] = 0
    }
}
