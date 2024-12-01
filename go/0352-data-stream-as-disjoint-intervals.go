package main

import "sort"

type SummaryRanges struct {
	numSet map[int]bool
}

func Constructor() SummaryRanges {
	return SummaryRanges{numSet: map[int]bool{}}
}

func (this *SummaryRanges) AddNum(value int) {
	this.numSet[value] = true
}

func (this *SummaryRanges) GetIntervals() [][]int {
	nums := []int{}
	for num, _ := range this.numSet {
		nums = append(nums, num)
	}
	sort.Ints(nums)

	res := [][]int{}

	i := 0

	for i < len(nums) {
		start := nums[i]

		for i +1 < len(nums) && nums[i] +1 == nums[i+1] {
			i++
		}

		res = append(res, []int{start, nums[i]})
		i++
	}

	return res
}

func main() {
	
}