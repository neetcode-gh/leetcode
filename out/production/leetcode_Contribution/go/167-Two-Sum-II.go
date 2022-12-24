func twoSum(numbers []int, target int) []int {
    p1 := 0
    p2 := len(numbers) - 1
    
    for p1 < p2 {
        n := numbers[p1] + numbers[p2]
        if n == target {
            return []int{p1 + 1, p2 + 1}
        }
        
        if n > target {
            p2--
        }else{
            p1++
        }
    }
    
    return []int{0,0}
}
