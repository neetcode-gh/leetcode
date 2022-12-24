class Solution {
    func mergeTriplets(_ triplets: [[Int]], _ target: [Int]) -> Bool {
        var doesOneValidTripletExist: Bool = false
        var maxFromTriplets: [Int] = [0, 0, 0] // 1 <= elements <= 1000
        
        for triplet in triplets {
            // Ignore those triplets which are not within range
            var isWithinRange: Bool = true
            for i in 0..<3 {
                if triplet[i] > target[i] {
                    isWithinRange = false
                    break
                }
            }
            
            guard isWithinRange else { continue }
            doesOneValidTripletExist = true;
            
            // Max triplet computation
            for i in 0..<3 {
                maxFromTriplets[i] = max(maxFromTriplets[i], triplet[i])
            }
        }
        
        return doesOneValidTripletExist && (maxFromTriplets == target)
    }
}
