/*
* Using a minHeap (And BigInteger, alternativly you can compare strings too)
*/
class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {

        val minHeap = PriorityQueue<BigInteger>{ a, b -> 
            if(a < b)
                1
            else
                -1
        }

        nums.forEach {
            minHeap.add(it.toBigInteger())
        }

        var kth = k
        while(kth > 1) {
            minHeap.poll()
            kth--
        }

        return minHeap.poll().toString()
    }
}

/*
* Using a maxHeap (And comparing strings, alternativly you can use BigInteger too)
*/
class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {

        val minHeap = PriorityQueue<String>{ a, b -> 
            if(a.length > b.length)
                1
            else if(a.length < b.length)
                -1
            else {
                var toReturn = 0
                for(i in 0 until a.length) {
                    if(a[i] > b[i]) {
                        toReturn = 1
                        break
                    } else if(a[i] < b[i]){
                        toReturn = -1
                        break
                    }
                }
                toReturn
            }
        }

        nums.forEach {
            minHeap.add(it)
            if(minHeap.size > k) minHeap.poll()
        }

        return minHeap.peek()
    }
}
