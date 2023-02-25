class Solution {
    fun totalFruit(fruits: IntArray): Int {

        val baskets = HashMap<Int, Int>()
        var left = 0
        var right = 0
        var max = 0

        while (right < fruits.size) {

            baskets[fruits[right]] = baskets.getOrDefault(fruits[right], 0) + 1

            while (baskets.size > 2) {
                val fruit = fruits[left]
                baskets[fruit] = baskets.getOrDefault(fruit, 0) - 1
                left++

                if (baskets[fruit] == 0) 
                    baskets.remove(fruit)
            }

            max = maxOf(max, right - left + 1)
            right++
        }

        return max
    }
}
