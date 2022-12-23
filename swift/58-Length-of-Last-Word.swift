class Solution {
    func lengthOfLastWord(_ s: String) -> Int {
        var length: Int = 0

        for c in s.reversed() {
            if c != " " {
                length += 1
            } else if (length > 0){
                break;
            }
        }
      
        return length
    }
}
