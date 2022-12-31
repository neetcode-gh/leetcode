class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        val heap = PriorityQueue<Int>()

        for (num in nums) {
            heap.add(num)

            if (heap.size > k)
                heap.poll()
        }

        return heap.peek()
    }

    // O(n) average time complexity - Quick Select algorithm
    fun findKthLargestRecursive(nums: IntArray, k: Int): Int = quickSelect(
        array = nums,
        startIndex = 0,
        endIndex = nums.lastIndex,
        k = k
    )

    private fun quickSelect(
        array: IntArray,
        startIndex: Int,
        endIndex: Int,
        k: Int,
    ): Int {
        // find a valid position for pivot such that all values that
        // appear before the pivot are lower than the value of pivot,
        // and, all values that appear after the pivot are greater
        // than the pivot.
        @Suppress("UnnecessaryVariable") val pivotIndex = endIndex
        var validIndexForPivot = startIndex
        for (i in startIndex until endIndex) {
            if (array[i] < array[pivotIndex]) {
                val temp = array[i]
                array[i] = array[validIndexForPivot]
                array[validIndexForPivot] = temp
                validIndexForPivot++
            }
        }
        // put pivot element in it's sorted position
        val temp = array[validIndexForPivot]
        array[validIndexForPivot] = array[pivotIndex]
        array[pivotIndex] = temp

        return if (validIndexForPivot == (array.size - k)) array[validIndexForPivot]
        else if (validIndexForPivot > array.size - k) quickSelect(array, startIndex, validIndexForPivot - 1, k)
        else quickSelect(array, validIndexForPivot + 1, endIndex, k)
    }
}