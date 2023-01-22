func generate(rowIndex int) [][]int {
    if rowIndex == 0 {
        return [][]int{{1}}
    } else {
        return getAllRow(rowIndex - 1)
    }
}

func getAllRow(rowIndex int) [][]int {
    if rowIndex == 0 {
        return [][]int{{1}}
    }
    ListPrec := getAllRow(rowIndex - 1)
    Len := len(ListPrec[len(ListPrec) - 1])
    ListPrec = append(ListPrec, []int{1})
    for i := 0; i < Len - 1; i++ {
        ListPrec[len(ListPrec) - 1] = append(
            ListPrec[len(ListPrec) - 1], 
            ListPrec[len(ListPrec) - 2][i] + ListPrec[len(ListPrec) - 2][i + 1])
    }
    ListPrec[len(ListPrec) - 1] = append(ListPrec[len(ListPrec) - 1], 1)
    return ListPrec
}
