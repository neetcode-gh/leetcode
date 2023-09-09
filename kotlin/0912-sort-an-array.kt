/*
* Merge sort
*/
class Solution {
    fun sortArray(nums: IntArray): IntArray {
        mergeSort(nums, 0, nums.lastIndex)
        return nums
    }

    private fun mergeSort(nums: IntArray, left: Int, right: Int) {
        if(left == right) return

        val mid = (left + right) / 2
        mergeSort(nums, left, mid)
        mergeSort(nums, mid + 1, right)
        merge(nums, left, mid, right)

        return
    }

    private fun merge(nums: IntArray, left: Int, mid: Int, right: Int) {
        val leftPart = nums.copyOfRange(left, mid + 1)
        val rightPart = nums.copyOfRange(mid + 1, right + 1)
        var i = left
        var j = 0
        var k = 0

        while(j < leftPart.size && k < rightPart.size) {
            if(leftPart[j] <= rightPart[k]) {
                nums[i] = leftPart[j]
                j++
            }else{
                nums[i] = rightPart[k]
                k++
            }
            i++
        }

        while(j < leftPart.size) {
                 nums[i] = leftPart[j]
                 j++
                 i++
            }

        while(k < rightPart.size) {
            nums[i] = rightPart[k]
            k++
            i++
        }
    }
} 

/*
* Quick sort
*/
class Solution {
    fun sortArray(nums: IntArray): IntArray {
        
        quickSort(nums, 0, nums.lastIndex)
        return nums
    }

    private fun quickSort(nums: IntArray, low: Int, high: Int) {
        if (low < high) {
            val pivotIndex = partition(nums, low, high)
            quickSort(nums, low, pivotIndex - 1)
            quickSort(nums, pivotIndex + 1, high)
        }
    }

    private fun partition(nums: IntArray, low: Int, high: Int): Int {
        val r = (low..high).random()
        nums.swap(r, high)
        val pivot = nums[high]
        var i = low

        for (j in low until high) {
            if (nums[j] <= pivot) {
                nums.swap(i, j)
                i++
            }
        }

        nums.swap(i, high)
        return i
    }

    fun IntArray.swap(i: Int, j: Int) {
        this[i] = this[j].also { this[j] = this[i] }
    }
}

/*
* Heap sort
*/
class Solution {
    fun sortArray(nums: IntArray): IntArray {
        
        heapSort(nums)
        return nums
    }

    private fun heapSort(nums: IntArray) {
        val n = nums.size

        for(i in (n/2 - 1) downTo 0)
            heapify(nums, n, i)

        for(i in n-1 downTo 0) {
            nums.swap(0, i)
            heapify(nums, i, 0)
        }
    }

    private fun heapify(nums: IntArray, n: Int, i: Int) {
        var largest = i

        val left = 2 * i + 1
        val right = 2 * i + 2

        if(left < n && nums[left] > nums[largest])
            largest = left
        if(right < n && nums[right] > nums[largest])
            largest = right
        
        if(largest != i) {
            nums.swap(i, largest)
            heapify(nums, n, largest)
        }
    }
    
    fun IntArray.swap(i: Int, j: Int) {
        this[i] = this[j].also{ this[j] = this[i] }
    }
}
