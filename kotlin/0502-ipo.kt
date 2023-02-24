class Solution {
    fun findMaximizedCapital(k: Int, w: Int, profits: IntArray, capital: IntArray): Int {

        var totalCap = w
        // Pair of ("Profit" to "CapitalCost")
        val minCapital = PriorityQueue<Pair<Int, Int>> { a,b -> a.second - b.second }
        val maxProfit = PriorityQueue<Int> { a,b -> b - a }

        profits.zip(capital).forEach { 
            minCapital.add(it.first to it.second)
        }

        repeat(k) exit@ {
            while(minCapital.isNotEmpty() && minCapital.peek().second <= totalCap) {
                val (prof, cap) = minCapital.poll()
                maxProfit.add(prof)
            }
            if(maxProfit.isEmpty()) return@exit
            totalCap += maxProfit.poll()
        }
        
        return totalCap
    }
}
