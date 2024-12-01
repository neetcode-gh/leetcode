class Solution {
    func minWindow(_ s: String, _ t: String) -> String {
    if t.isEmpty  { return "" }

        var countT: [Character : Int] = [:]
        var window: [Character : Int] = [:]
        let stringArray = Array(s)

        // Storing each char and its count in hashMap
        for char in t {
            countT[char, default: 0] += 1
        }

        var have = 0
        let need = t.count
        var resultRange = (-1, -1)
        var resultLength = Int.max
        var l = 0

        for r in 0...s.count - 1 {
            let char = stringArray[r]
            window[char, default: 0] += 1

            if countT.contains(where: { $0.key == char }) && window[char] == countT[char] {
            // for the case of repeated characters "have" should be increased by count, not by 1
                have += countT[char, default: 0]
            }

            while have == need {
                // update result
                if r - l + 1 < resultLength {
                    resultRange = (l, r)
                    resultLength  = r - l + 1
                }
                // pop from left of the window
                window[stringArray[l], default: 0] -= 1

                if countT.contains(where: { $0.key == stringArray[l] })
                    && window[stringArray[l], default: 0] < countT[stringArray[l], default: 0] {
                    //subtract all count, because in second iteration will be added total count of char.
                    have -= countT[stringArray[l], default: 0]
                }

                l += 1
            }
        }

        guard resultLength != Int.max else { return "" }
        return String(stringArray[resultRange.0...resultRange.1])
    }
}
