class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        var newArray = strs.sorted()
        var string = ""

        for (char1, char2) in zip(newArray.first!, newArray.last!) {
            if (char1 == char2) {
                string.append(char1);
            } else {
                break
            }
        }
        return string
    }
}