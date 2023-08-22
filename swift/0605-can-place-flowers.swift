// Time: O(n)
// Space: O(1)
class Solution {
    func canPlaceFlowers(_ flowerbed: [Int], _ n: Int) -> Bool {
        var empty = (flowerbed[0] == 1) ? 0 : 1
        var getN = n
        for f in flowerbed {
            if f == 1 {
                getN -= (empty - 1) / 2
                empty = 0
            }
            else {
                empty += 1
            }
        }
        getN -= empty / 2
        return getN <= 0
    }
}