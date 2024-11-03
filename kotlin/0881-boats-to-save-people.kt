class Solution {
    fun numRescueBoats(people: IntArray, limit: Int): Int {
        people.sort()

        var left = 0
        var right = people.lastIndex
        var res = 0

        while (left <= right) {
            if (people[left] + people[right] <= limit)
                left++
            right--
            res++
        }

        return res
    }
}
