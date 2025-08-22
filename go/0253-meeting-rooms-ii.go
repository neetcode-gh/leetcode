/**
 * Definition of Interval:
 * type Interval struct {
 *     Start, End int
 * }
 */

/**
 * @param intervals: an array of meeting time intervals
 * @return: the minimum number of conference rooms required
 */

import "sort"

func MinMeetingRooms(intervals []*Interval) int {
	// Write your code here
	meetings := [][2]int{}
	for _, interval := range intervals {
		meetings = append(meetings, [2]int{interval.Start, 0})
		meetings = append(meetings, [2]int{interval.End, 1})
	}

	sort.Slice(meetings, func(i, j int) bool {
		return meetings[i][0] < meetings[j][0]
	})

	res, count := 0, 0

	for _, meeting := range meetings {
		if meeting[1] == 0 {
			count++
		} else {
			count--
		}
		if count > res {
			res = count
		}
	}
	return res
}
