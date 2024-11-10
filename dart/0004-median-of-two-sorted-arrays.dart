class Solution {
  double findMedianSortedArrays(List<int> nums1, List<int> nums2) {
      List<int>list = nums1 + nums2;
    
      list.sort();
     int index = list.length ~/ 2;
     bool isodd = (list.length & 0x01) != 0;
     if (!isodd) {
       return (list[index] + list[index - 1]) / 2;
     }
   return double.parse(list[index].toString());
  }
}
