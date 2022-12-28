public class Solution {
      public double FindMedianSortedArrays(int[] nums1, int[] nums2)
      { 
         if (nums1.Length <= 0 && nums2.Length == 1)
            {
                return nums2[0];
            }
            if (nums2.Length <= 0 && nums1.Length == 1)
            {
                return nums1[0];
            }
          
            var m = nums1.Length;
            var n = nums2.Length;
            if (m > n)
            {
                return FindMedianSortedArrays(nums2, nums1);
            }
            var total = m + n;
            var half = (total + 1) / 2;
            var left = 0;
            var right = m;
            var result = 0.0;
            while (left <= right)
            {
                var i = left + (right - left) / 2;
                var j = half - i; 
                var left1 = (i > 0) ? nums1[i - 1] : int.MinValue;
                var right1 = (i < m) ? nums1[i] : int.MaxValue;
                var left2 = (j > 0) ? nums2[j - 1] : int.MinValue;
                var right2 = (j < n) ? nums2[j] : int.MaxValue;
               
                if (left1 <= right2 && left2 <= right1)
                { 
                    if (total % 2 == 0)
                    {
                        result = (Math.Max(left1, left2) + Math.Min(right1, right2)) / 2.0;
                    }
                    else
                    {
                        result = Math.Max(left1, left2);
                    }
                    break;
                }
                else if (left1 > right2)
                {
                    right = i - 1;
                }
                else
                {
                    left = i + 1;
                }
            }
            return result;
      }
}
