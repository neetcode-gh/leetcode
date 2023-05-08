class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var column: [ Int : [Character] ] = [:]
        var subBoxes: [ Int : [Character] ] = [:]

        for (rowIndex, row) in board.enumerated() {
            var rowBox: [Character] = []

            // check each row
            for (index, element) in row.enumerated() {

                if element != "." && (rowBox.contains(element) || column[index, default: []].contains(element)) {
                    return false
                } else {
                    column[index, default: []].append(element)
                    rowBox.append(element)

                    let subBoxNumber = Double(rowBox.count) / 3.0 // sudoku is 3 x 3
                    let subBoxIndex:Int = Int(ceil(subBoxNumber)) // find nearest up whole number

                    if element != "."  && subBoxes[subBoxIndex, default: []].contains(element) {
                        return false
                    } else {
                        subBoxes[subBoxIndex,  default: []].append(element)
                    }
                }
            }

            if (rowIndex + 1) % 3 == 0 {
                subBoxes.removeAll()
            }

            rowBox = []
        }
        return true
    }
}
