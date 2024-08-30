type NumArray struct {
	nums []int
}

func Constructor(nums []int) NumArray {
	for i := 1; i < len(nums); i++ {
		nums[i] += nums[i-1]
	}
	return NumArray{nums}
}

func (this *NumArray) SumRange(left int, right int) int {
	var a int
	if left-1 < 0 {
		a = 0
	} else {
		a = this.nums[left-1]
	}
	b := this.nums[right]
	return b - a
}

/**
 * Your NumArray object will be instantiated and called as such:
 * obj := Constructor(nums);
 * param_1 := obj.SumRange(left,right);
 */