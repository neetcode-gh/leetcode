class Solution {
    private let numberLetters: [Character: String] = [
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    ]
    func letterCombinations(_ digits: String) -> [String] {
        guard !digits.isEmpty else { return [] }
        var result: [String] = []
        var digits = digits.map { $0 }
        func generateCombinations(_ index: Int, _ path: String) {
            guard index < digits.count else {
                result.append(path)
                return
            }
            let digit = digits[index]
            if let letters = numberLetters[digit] {
                for letter in letters {
                    generateCombinations(index + 1, path + "\(letter)")
                }
            }
        }
        generateCombinations(0, "")
        return result
    }
}