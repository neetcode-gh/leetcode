class Solution {
    fun minStickers(stickers: Array<String>, target: String): Int {
        val stickCount = HashMap<String, MutableMap<Char, Int>>().apply {
            stickers.forEach { s ->
                this[s] = s.groupingBy { it }
                    .eachCount()
                    .toMutableMap()
            }
        }

        val dp = HashMap<String, Int>()

        fun dfs(t: String, stick: MutableMap<Char, Int>): Int {
            dp[t]?.let {
                return it
            }

            var res = if (stick.isEmpty()) 0 else 1
            val remainT = StringBuilder()
            for (c in t) {
                if (c in stick && stick[c]!! > 0) {
                    stick[c] = stick[c]!! - 1
                } else {
                    remainT.append(c)
                }
            }

            if (remainT.length > 0) {
                val remainTS = remainT.toString()
                var used = Integer.MAX_VALUE
                for (s in stickCount.values) {
                    if (remainTS[0]!! !in s)
                        continue
                    used = minOf(used, dfs(remainTS, s.toMutableMap()))
                }

                dp[remainTS] = used
                res = if (used == Integer.MAX_VALUE ) Integer.MAX_VALUE else res + used
            }

            return res
        }


        val res = dfs(target, mutableMapOf<Char, Int>())
        return if (res == Integer.MAX_VALUE) -1 else res
    }
}
