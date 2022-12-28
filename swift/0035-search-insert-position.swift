class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var rows: [Set<Character>] = []
        var cols: [Set<Character>] = []
        var subBoxes: [[Set<Character>]] = []
        for i in 1...9 {
            rows.append(Set<Character>())
            cols.append(Set<Character>())
        }
        for i in 1...3 {
            var row: [Set<Character>] = []
            for j in 1...3 {
                row.append(Set<Character>())
            }
            subBoxes.append(row)
            
        }
        for i in 0...8 {
            for j in 0...8 {
                let val: Character = board[i][j]
                if (val == ".") {
                    continue
                }
                if (rows[i].contains(val) || cols[j].contains(val) || subBoxes[i/3][j/3].contains(val)){
                    return false
                }
                rows[i].insert(val)
                cols[j].insert(val)
                subBoxes[i/3][j/3].insert(val)
            }
        }
        return true
    }
}
