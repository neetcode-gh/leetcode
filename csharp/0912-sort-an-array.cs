public class Solution {

    private int[] aux;  // Auxiliary array for merging

    /// <summary>
    /// Sorts the input array using the classical merge sort algorithm. Uses
    /// aux array to save space instead of keeping copies of all array segments
    /// </summary>
    /// <param name="nums">The input array of integers to be sorted</param>
    /// <returns>The sorted array of integers</returns>
    public int[] SortArray(int[] nums)
    {
        // Optimization: early return for empty arrays or arrays with one element
        if (nums == null || nums.Length <= 1) return nums;

        aux = new int[nums.Length];
        MergeSort(nums, 0, nums.Length - 1);

        return nums;
    }

    /// <summary>
    /// Recursively divides and merges the array segments
    /// </summary>
    /// <param name="nums">The input array of integers to be sorted</param>
    /// <param name="left">The start index of the segment to be sorted</param>
    /// <param name="right">The end index of the segment to be sorted</param>
    private void MergeSort(int[] nums, int left, int right)
    {
        // Base case: return when left has crossed right
        if (left >= right) return;

        // Get new mid to halve the array segment
        int mid = (left + right) / 2;

        // Sort the first and the second halves
        MergeSort(nums, left, mid);
        MergeSort(nums, mid + 1, right);

        // Copy to aux[]
        for (int k = left; k <= right; k++)
        {
            aux[k] = nums[k];
        }

        // Merge back to nums[]
        // two pointers to help merge 
        int i = left, j = mid + 1; 
        for (int k = left; k <= right; k++)
        {
            // If current left has crossed mid, nums Kth value should be current jth of aux; j++
            // Implies all the left elements have been merged; now we just add the remaining right elements, one by one, in order. 
            if (i > mid) nums[k] = aux[j++];
            // Else if current j has crossed right, nums kth value should be ith of aux; i++
            // Implies all the right elements have been merged; now we just add the remaining left elements, one by one, in order. 
            else if (j > right) nums[k] = aux[i++];
            // Else if ith value is greater than jth value in aux, nums kth value should be jth of aux; j++
            else if (aux[i] > aux[j]) nums[k] = aux[j++];
            // Else nums[k] is the left most unsorted value; i++
            else nums[k] = aux[i++];
        }
    }
}