class Solution {
    fun nextGreaterElement(nums1: IntArray, nums2: IntArray): IntArray {
        val res = IntArray(nums1.size){ -1 }

        val hm = HashMap<Int, Int>()
        for(i in 0 until nums1.size) 
            hm[nums1[i]] = i

        val stack = ArrayDeque<Int>()
        for(current in nums2){
            while(stack.isNotEmpty() && current > stack.getLast()){
                val element = stack.removeLast()
                val index = hm[element]!!
                res[index] = current
            }
            if(current in hm)
                stack.addLast(current)
        }

        return res
    }
}
