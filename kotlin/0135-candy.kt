// O(n) linear sweep solution
class Solution {
    fun candy(ratings: IntArray): Int {
        val n = ratings.size
        val candies = IntArray (n) { 1 }

        for (i in 1 until n) {
            if (ratings[i] > ratings[i - 1])
                candies[i] = candies[i - 1] + 1
        }

        for (i in n - 2 downTo 0){
            if (ratings[i] > ratings[i + 1])
                candies[i] = max(candies[i], candies[i + 1] + 1)
        }

        return candies.sum() ?: n
    }

//graph dfs solution
class Solution {
    fun candy(ratings: IntArray): Int {
        val n = ratings.size
        val outdegree = IntArray (n)

        for (i in 0 until n) {
            if (i > 0 && ratings[i] > ratings[i - 1])
                outdegree[i]++
            if (i + 1 < n && ratings[i] > ratings[i + 1])
                outdegree[i]++
        }

        val q = LinkedList<Int>()
        for ((index, degree) in outdegree.withIndex()) {
            if (degree == 0)
                q.addLast(index)
        }

        val candies = IntArray (n)
        while (q.isNotEmpty()) {
            val i = q.removeFirst()

            var candy = 1
            if (i > 0 && ratings[i] > ratings[i - 1])
                candy = maxOf(candy, candies[i - 1] + 1)
            if (i < n - 1 && ratings[i] > ratings[i + 1])
                candy = maxOf(candy, candies[i + 1] + 1)
            candies[i] = candy

            if (i > 0 && ratings[i] < ratings[i - 1]) {
                outdegree[i - 1]--
                if (outdegree[i - 1] == 0)
                    q.addLast(i - 1)
            }
            if (i < n - 1 && ratings[i] < ratings[i + 1]) {
                outdegree[i + 1]--
                if (outdegree[i + 1] == 0)
                    q.addLast(i + 1)
            }
        }

        return candies.sum()!!
    }
}
