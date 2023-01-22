/*
Maintain a stack of previous score,
summed after applying all operations
Time: O(n)
Space: O(n)
*/

import "strconv"

func calPoints(operations []string) int {
	record := []int{}

	for _, op := range operations {
		if len(record) > 0 && op == "C" {
			record = record[:len(record)-1]
		} else if len(record) > 0 && op == "D" {
			record = append(record, record[len(record)-1]*2)
		} else if len(record) > 0 && op == "+" {
			record = append(record, sum(record[len(record)-2:]))
		} else {
			iop, _ := strconv.Atoi(op)
			record = append(record, iop)
		}
	}
	return sum(record)
}

func sum(nums []int) int {
	res := 0
	for _, n := range nums {
		res += n
	}
	return res
}
