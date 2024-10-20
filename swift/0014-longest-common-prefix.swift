class Solution {
  func longestCommonPrefix(_ strs: [String]) -> String {
      var result = ""

      let firstStr = Array(strs[0])

      for i in 0..<firstStr.count {
          for s in strs {
              let sArray = Array(s)

              if i == sArray.count || sArray[i] != firstStr[i] {
                  return result
              }
          }
          result += String(firstStr[i])
      }

      return result
  }
}
