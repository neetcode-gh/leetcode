class Solution {
    fun plusOne(digits: IntArray): IntArray {
        for (i in digits.size-1 downTo 0) {
            digits[i] += 1

            if (digits[i] <= 9)
                return digits

            digits[i] = 0
        }

        return IntArray(digits.size+1).also{ it[0] = 1 }
    }
}