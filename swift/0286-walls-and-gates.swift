class Solution {
    func wallsAndGates(_ rooms: inout [[Int]]) {
        let numRows = rooms.count
        let numColumns = rooms[0].count
        
        var queue: [(row: Int, column: Int)] = []
        
        for row in 0..<numRows {
            for column in 0..<numColumns {
                guard rooms[row][column] == 0 else { continue }
                queue.append((row, column))
            }
        }
        
        let directions: [(row: Int, column: Int)] = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        var distance = 1
        var visited = Set<[Int]>()
        
        while !queue.isEmpty {
            for index in 0..<queue.count {
                let gate = queue.removeFirst()
                
                for direction in directions {
                    let row = gate.row + direction.row
                    let column = gate.column + direction.column
                    
                    guard row >= 0, row <= numRows - 1,
                          column >= 0, column <= numColumns - 1,
                          !visited.contains([row, column]),
                          rooms[row][column] == 2147483647
                    else { continue }
                    
                    rooms[row][column] = distance
                    queue.append((row, column))
                    visited.insert([row, column])
                }
            }
            distance += 1
        }
    }
}