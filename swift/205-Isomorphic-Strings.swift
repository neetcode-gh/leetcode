class Solution {
    func isIsomorphic(_ s: String, _ t: String) -> Bool {
        guard s.count == t.count else { return false }
        
        var mapSourceToDest: [Character: Character] = [:]
        var mapDestToSource: [Character: Character] = [:]
    
        for (sourceChar, destChar) in zip(s, t) {
            if let sourceMapped = mapSourceToDest[sourceChar] {
                guard sourceMapped == destChar else { return false }
            } else {
                mapSourceToDest[sourceChar] = destChar
            }

            if let destMapped = mapDestToSource[destChar] {
                guard destMapped == sourceChar else { return false }
            } else {
                mapDestToSource[destChar] = sourceChar
            }
        }

        return true
    }
}