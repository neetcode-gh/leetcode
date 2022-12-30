func minDistance(word1 string, word2 string) int {
	// Storing the cost grid takes O(m * n) space
	m, n := len(word1) + 1, len(word2) + 1
    costGrid := make([][]int, n)

    for row := range costGrid {
        costGrid[row] = make([]int, m)
    } 
    for col := range costGrid[0] {
        costGrid[0][col] = col
    } 
    for row := range costGrid {
        costGrid[row][0] = row
    }

	// Filling in the grid takes O(m * n) time
    for i := 1; i < n; i++ {
        for j := 1; j < m; j++ { 
            if word1[j-1] == word2[i-1] {
                costGrid[i][j] = costGrid[i-1][j-1]
            } else {
                costGrid[i][j] = minScore(i, j, costGrid)
            }
		}
    }
    
    return costGrid[n-1][m-1] 
}

func minScore(i, j int, costGrid [][]int) int {
	score := costGrid[i-1][j] + 1

    if costGrid[i-1][j-1] + 1 < score {
		score = costGrid[i-1][j-1] + 1
    }

	if costGrid[i][j-1] + 1 < score {
        score = costGrid[i][j-1] + 1
    }

	return score
}

