// Time: O(2^n)
// Space: O(n)
class Solution {
    func generateParenthesis(_ n: Int) -> [String] {
        var result: [String] = []
        generate(n, 0, 0, "", &result)
        return result
    }

    func generate(_ n: Int, _ open: Int, _ close: Int, _ str: String, _ result: inout [String]) {
        if open == n && close == n {
            result.append(str)
            return
        }
        if open < n {
            generate(n, open + 1, close, str + "(", &result)
        }
        if open > close {
            generate(n, open, close + 1, str + ")", &result)
        }
    }
}