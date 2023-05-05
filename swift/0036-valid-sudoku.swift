class Solution {
    struct Tuple<T: Hashable>: Hashable {
        let x: T 
        let y: T 

        init(_ x: T, _ y: T) {
            self.x = x 
            self.y = y 
        }
    }
    
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var cols = [Int: Set<Character>]()
        var rows = [Int: Set<Character>]()
        var squares = [Tuple<Int>: Set<Character>]() 

        for r in 0..<9 {
            for c in 0..<9 {
                let char = board[r][c]
                if char == "." {
                    continue
                }
                if rows[r]?.contains(char) == true
                    || cols[c]?.contains(char) == true
                    || squares[Tuple(r / 3, c / 3)]?.contains(char) == true {
                    return false
                }
                cols[c, default: Set()].insert(char)
                rows[r, default: Set()].insert(char)
                squares[Tuple(r / 3, c / 3), default: Set()].insert(char)
            }
        }

        return true
    }
}