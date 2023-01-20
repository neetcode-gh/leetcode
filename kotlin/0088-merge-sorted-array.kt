class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int): Unit {
        var end = nums1.size-1; var _m = m-1; var _n = n-1
        while(_m >= 0 && _n >= 0){
            if(nums1[_m] > nums2[_n]){
                nums1[end] = nums1[_m]
                _m--
            }else{ //nums1[mEnd] < nums2[nEnd]
                nums1[end] = nums2[_n]
                _n--
            }
            end--
        }
        //fill nums1 with leftover elements from nums2
        while(_n >= 0){
            System.out.println("$end $_n")
            nums1[end] = nums2[_n]
            _n--
            end--
        }
    }
}
