import scala.collection.mutable.ListBuffer

object Solution {
    def threeSum(nums: Array[Int]): List[List[Int]] = {
        val res = ListBuffer[List[Int]]()
        val sortedNums = nums.sorted
        val endIdx = sortedNums.length - 1

        for (i <- 0 to endIdx) {
            val curr = sortedNums(i)
            // To prevent duplicate triplet, but allow the triplet to contain same numbers
            val shouldSkip = i > 0 && curr == sortedNums(i - 1)
            if (!shouldSkip) {
                var (s, e) = (i + 1, endIdx)
                val target = 0 - curr

                while (s < e) {
                    val sum = sortedNums(s) + sortedNums(e)
                    if (sum == target) {
                        res += List(curr, sortedNums(s), sortedNums(e))
                        e -= 1
                        while (e > 0 && sortedNums(e) == sortedNums(e + 1)) {
                            e -= 1
                        }
                    } else if (sum < target) {
                        s += 1
                    } else {
                        e -= 1
                    }
                }
            }
        }

        res.toList
    }
}