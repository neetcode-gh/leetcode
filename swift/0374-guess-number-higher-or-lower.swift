// Time: O(log n)
// Space: O(1)
class Solution : GuessGame {
    func guessNumber(_ n: Int) -> Int {
        // return a num btw 1,..,n
        var low = 1
        var high = n

        while true {
            let mid = low + (high - low) / 2
            let myGuess = guess(mid)
            if myGuess == 1 {
                low = mid + 1
            }
            else if myGuess == -1 {
                high = mid - 1
            }
            else {
                return mid
            }
        }
    }
}