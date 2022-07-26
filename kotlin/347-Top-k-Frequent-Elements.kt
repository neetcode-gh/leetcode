package kotlin


fun main() {
    val nums = intArrayOf(1, 1, 1, 1, 2, 2, 3)
}

fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val res = mutableListOf<Int>()

    val count = hashMapOf<Int, Int>()

    val freq = MutableList<MutableList<Int>>(nums.size + 1) {
        mutableListOf()
    }

    for (n in nums) {
        count[n] = count.getOrDefault(n, 0) + 1
    }

    for ((n, c) in count) {
        freq[c].add(n)
    }

    for (i in freq.size - 1 downTo 0) {
        for (n in freq[i]) {
            res.add(n)
            if (res.size == k) {
                return res.toIntArray()
            }
        }
    }

    return intArrayOf()
}