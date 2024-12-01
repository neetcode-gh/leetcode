/*
    Given an array of integers nums, sort the array in ascending order and return it.
    Ex. nums = [5,2,3,1] -> [1,2,3,5]

    Use Merge sort to sort the array.

    Time - O(nlogn)
    Space - O(n)
*/

class Solution {
  private:
    void merge(vector<int> &nums, int low, int mid, int high) {
        if(low >= high) 
            return;
        
        int l = low, r = mid + 1, k = 0, size = high - low + 1;
        vector<int> sorted(size, 0);
        
        while (l <= mid and r <= high){
            if(nums[l] < nums[r])
                sorted[k++] = nums[l++];
            else
                sorted[k++] = nums[r++];
        }

        while(l <= mid) 
            sorted[k++] = nums[l++];
        while(r <= high) 
            sorted[k++] = nums[r++];
        
        for(k = 0; k < size; k++)
            nums[k + low] = sorted[k];
    }

    void mergeSort(vector<int>& nums, int low, int high){
        if(low >= high) 
            return;
	    
        int mid = low + (high - low) / 2;
	    
        mergeSort(nums, low, mid);
	    mergeSort(nums, mid + 1, high);
	    merge(nums, low, mid, high);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size()-1);
        return nums;
    }
};
