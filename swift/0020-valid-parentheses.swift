class Solution {
    // Input: s = "()[]{}"
    func isValid(_ s: String) -> Bool {
         let closeToOpenDic: [Character:Character] = [
        "}": "{",
        ")": "(",
        "]": "["]
          var stack = [Character]()
        for char in s {
            for char in s {
                let c = closeToOpenDic[char]
                if c == nil {
                    stack.append(char)
                }else{
                    if stack.popLast() != c {
                        return false
                    }
                }
            }
        }
        return stack.count == 0
    }
}
