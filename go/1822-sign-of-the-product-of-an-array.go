/*
Time: O(n)
Space: O(1)
*/

func arraySign(nums []int) int {
    neg := 0
    for _, n := range nums {
        if n == 0 {
            return 0
        } else if n < 0 {
            neg++
        }
    }
    if neg%2 == 0 {
        return 1
    } else {
        return -1
    }
}
