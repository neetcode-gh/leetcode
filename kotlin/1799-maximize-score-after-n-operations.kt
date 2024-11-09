class Solution {
    fun maxScore(nums: IntArray): Int {
        val cache = IntArray(1 shl nums.size) { -1 }

        fun dfs(mask: Int, op: Int): Int {
            if (cache[mask] != -1) return cache[mask]

            for (i in 0 until nums.size) {
                for (j in i + 1 until nums.size) {
                    if ((1 shl i) and mask > 0 || (1 shl j) and mask > 0)
                        continue
                    val newMask = mask or (1 shl i) or (1 shl j)
                    val score = op * gcd(nums[i], nums[j])
                    cache[mask] = maxOf(
                        if (cache[mask] != -1) cache[mask] else 0,
                        score + dfs(newMask, op + 1)
                    )
                }
            }

            return if (cache[mask] != -1) cache[mask] else 0
        }

        return dfs(0, 1)
    }

    fun gcd(_x: Int, _y: Int): Int {
        var x = _x
        var y = _y

        while (x != y) {
             if (x > y)
            x -= y
        else
            y -= x
        }

        return x
    }
}
