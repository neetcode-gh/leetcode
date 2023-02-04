class Solution {
    func calPoints(_ operations: [String]) -> Int {
        var scoreArray = [Int]()
		for i in 0..<operations.count {
			if operations[i] == "C" {
				scoreArray.removeLast()
			} else if operations[i] == "D" {
				scoreArray.append(scoreArray.last! * 2)
			} else if operations[i] == "+" {
				scoreArray.append(scoreArray[scoreArray.count - 2] + scoreArray[scoreArray.count - 1])
			} else {
				scoreArray.append(Int(operations[i])!)
			}
		}
		return scoreArray.isEmpty ? 0 : scoreArray.reduce(0, +)
    }
}