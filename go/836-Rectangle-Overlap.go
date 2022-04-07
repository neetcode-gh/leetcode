package go

func isRectangleOverlap(rec1 []int, rec2 []int) bool {
	if rec1[2] > rec2[0] && rec1[3] > rec2[1] && rec1[0] < rec2[2] && rec1[1] < rec2[3] {
			if rec1[0] != rec1[2] && rec1[1] != rec1[3]  && rec2[0] != rec2[2] && rec2[1] != rec2[3] {
					return true
			}
	}
	return false
}
