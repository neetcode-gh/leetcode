class Solution {
    func removeStars(_ s: String) -> String {
        var stack = [Character]()

        for char in s {
            if char == "*" {
                stack.removeLast()
            } else {
                stack.append(char)
            }
        }

        return String(stack)
    }
}
