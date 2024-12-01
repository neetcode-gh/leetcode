//another solution using a max Heap and a min Heap.
class Solution {
    fun minimumDeviation(nums: IntArray): Int {

        val minHeap = PriorityQueue<Int>()
        var maxHeap = PriorityQueue<Int>(Collections.reverseOrder())
        var res = Integer.MAX_VALUE

        // O(N)
        // For each number, we are adding the largest number it can become
        // Even numbers can't get bigger, so we add it
        // Odd Numbers can get to twice it size, so we add that
        for(num in nums) {
            minHeap.add( if(num % 2 == 0) num else num * 2)
            maxHeap.add( if(num % 2 == 0) num else num * 2)
        }

        var maxDiff = maxHeap.peek() - minHeap.peek()
        var max = maxHeap.poll()

        // O(nlogM * logN)
        // We are halving each even number in our max, adding it to min and max, and getting the new possible min each time
        // Loop until maxHeap top reached an odd number, then we are checked all possible mins
        while(max % 2 == 0) {
            max /= 2
            minHeap.add(max)
            maxHeap.add(max)
            max = maxHeap.poll()
            maxDiff = minOf(maxDiff, max - minHeap.peek())
        }

        return maxDiff
    }
}

class Solution {
    fun minimumDeviation(nums: IntArray): Int {

        // minHeap with pair of N to it's maximum value X that N can get to.
        // For odd Numbers, N = N and X = 2 * N
        // For even numbers, N = N/2 until it's odd, X = N
        val minHeap = PriorityQueue<Pair<Int, Int>> {a,b -> a.first - b.first} 
        var heapMax = 0
        var res = Integer.MAX_VALUE

        // O(nlogm)
        for(_num in nums) {
            var num = _num
            while(num % 2 == 0) {
                num /= 2
            }
            minHeap.add(num to maxOf(_num, 2 * num))
            heapMax = maxOf(heapMax, num)
        }

        // O(nlogm * logn)
        while(minHeap.size == nums.size) {
            val (n, nMax) = minHeap.poll()
            res = minOf(res, heapMax - n) 
            if(n < nMax) {
                minHeap.add(n * 2 to nMax)
                heapMax = maxOf(heapMax, n * 2)
            }
        }

        return res
    }
}
