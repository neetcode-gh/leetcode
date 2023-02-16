type NumArray struct {
	Array []int
}

func Constructor(nums []int) NumArray {
	for i := range nums {
		if i == 0 {
			nums[i] = nums[i]
			continue
		}
		nums[i] += nums[i-1]
	}
	return NumArray{Array: nums}
}

func (this *NumArray) SumRange(left int, right int) int {
	rightValue := this.Array[right]
	var leftValue int
	if left-1 >= 0 {
		leftValue = this.Array[left-1]
	} else {
		leftValue = 0
	}
	return rightValue - leftValue
}

/**
 * Your NumArray object will be instantiated and called as such:
 * obj := Constructor(nums);
 * param_1 := obj.SumRange(left,right);
 */
