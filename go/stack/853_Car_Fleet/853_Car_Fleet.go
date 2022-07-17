package carfleet

import (
	"sort"
)

// custom Sort
type positionAndSpeed struct {
	position int
	speed    int
}

type positionAndSpeedSlice []positionAndSpeed

func (p positionAndSpeedSlice) Less(i, j int) bool {
	return p[i].position < p[j].position
}

func (p positionAndSpeedSlice) Len() int {
	return len(p)
}

func (p positionAndSpeedSlice) Swap(i, j int) {
	p[i].position, p[j].position = p[j].position, p[i].position
	p[i].speed, p[j].speed = p[j].speed, p[i].speed
}

func carFleet(target int, position []int, speed []int) int {
	arr := make(positionAndSpeedSlice, len(position))
	var stack []float64
	for i := 0; i < len(position); i++ {
		arr[i] = positionAndSpeed{
			position: position[i],
			speed:    speed[i],
		}
	}
	sort.Sort(arr)
	// simpler way to sort without custom Less, Swap
	//**********
	// sort.SliceStable(arr, func(i, j int) bool {
	// 	return arr[i].position < arr[j].position
	// })
	//**********
	i := len(arr) - 1
	for i >= 0 {
		// inserting the time taken to reach the final target
		stack = append(stack, float64(target-arr[i].position)/float64(arr[i].speed))

		// if there are more than 2 elements on the stack and if the 2 elements are colliding with eah other.
		if len(stack) >= 2 && stack[len(stack)-1] <= stack[len(stack)-2] {
			stack = stack[:len(stack)-1]
		}
		i--
	}
	return len(stack)
}
