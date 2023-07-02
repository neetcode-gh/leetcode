func getConcatenation(nums []int) []int {
  n := len(nums)
	ans := make([]int, 2*n)	//lets make an array of int type and 2*n size
	i := 0
	for i < n {		//implementing for loop for the given condition
		ans[i] = nums[i]
		ans[i+n] = nums[i]
		i++
	}
	return ans
}
