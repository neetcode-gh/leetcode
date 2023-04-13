type NumArray struct {
	Sums []int
}

func Constructor(nums []int) NumArray {
	cur, numArray := 0, NumArray{}
	for _, val := range nums {
		cur += val
		numArray.Sums = append(numArray.Sums, cur)
	}
	return numArray
}

func (this *NumArray) SumRange(left int, right int) int {
	leftSum := 0
	if left > 0 {
		leftSum = this.Sums[left-1]
	}

	rightSum := this.Sums[right]

	return rightSum - leftSum
}
