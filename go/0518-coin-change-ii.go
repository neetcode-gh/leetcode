func change(amount int, coins []int) int {

	row := make([]int, amount+1)
	row[0] = 1

	for i := len(coins) - 1; i >= 0; i-- {

		nextRow := make([]int, amount+1)
		nextRow[0] = 1

		for a := 1; a < amount+1; a++ {
			nextRow[a] = row[a]
			if a-coins[i] >= 0 {
				nextRow[a] += nextRow[a-coins[i]]
			}
		}

		row = nextRow
	}

	return row[amount]
}
  