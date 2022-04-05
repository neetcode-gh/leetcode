/*
 * Question Link: https://leetcode.com/problems/encode-and-decode-strings/
 */
class EncodeDecodeStrings {
    
    /*
     - Parameter strs: a list of strings
     
     - Returns: encodes a list of strings to a single string.
     */
    func encode(_ strs: [String]) -> String {
        var res = ""
        for s in strs {
            res += String(s.count) + "#" + s
        }
        return res
    }

    /*
     - Parameter str: A string
     
     - Returns: dcodes a single string to a list of strings
     */
    func decode(_ str: String) -> [String] {
        var res = [String](), i = 0
        
        let strChars = Array(str)
        while i < strChars.count {
            var j = i
            while strChars[j] != "#" {
                j += 1
            }
            let length = Int(String(strChars[i..<j]))!
            res.append(String(strChars[j+1...j+length]))
            i = j + 1 + length
        }
        return res
    }
}
