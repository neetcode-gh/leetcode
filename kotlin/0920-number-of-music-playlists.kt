class Solution {
    fun numMusicPlaylists(n: Int, goal: Int, k: Int): Int {
        val cache = Array (n + 1) { LongArray (goal + 1) { -1 } }
        val mod = 1000000007

        fun count(song: Int, left: Int): Long {
            if (left == 0) 
                return if (song == n) 1L else 0L
            if (cache[song][left] != -1L) return cache[song][left]

            var res = 0L
            if (song + 1 <= n) 
                res += (n - song) * count(song + 1, left - 1)
            if (song - k > 0) 
                res += (song - k) * count(song, left - 1)
                
            cache[song][left] = res % mod
            return cache[song][left]
        }

        return count(0, goal).toInt()
    }
}
