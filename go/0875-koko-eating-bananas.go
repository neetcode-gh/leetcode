// canEat returns true if all the bananas can be eaten within the time limit at speed
func canEat(piles []int, timeLimit, speed int) bool {
	timeNeed := 0
	for _, banana := range piles {
		timeNeed += (banana + speed - 1) / speed
		if timeNeed > timeLimit {
			return false
		}
	}

	return true
}

func minEatingSpeed(piles []int, h int) int {
	// more bananas can be eaten with more speed
	// check if all the bananas can be eaten with a particular speed
	// if possible, store the ans & try smaller speed, greater speed otherwise
	lo, hi, ans := 1, 1000000000, 1
	for lo <= hi {
		mid := (lo + hi) / 2
		if canEat(piles, h, mid) {
			ans = mid
			hi = mid - 1
		} else {
			lo = mid + 1
		}
	}

	return ans
}
