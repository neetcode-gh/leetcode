/** 
 * The API guess is defined in the parent class.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * fun guess(num:Int):Int {}
 */

class Solution:GuessGame() {
    override fun guessNumber(n:Int):Int {
        var l = 1
        var r = n
        while ( true ) {
            val mid = l + (r - l) / 2
            val res = guess(mid)
            if(res == 0) return mid
            if(res > 0) l = mid + 1 
            if(res < 0) r = mid - 1
        }
    }
}
