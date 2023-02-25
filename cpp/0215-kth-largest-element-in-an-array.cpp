/*
    Given array and int k, return kth largest element in array
    Ex. nums = [3,2,1,5,6,4], k = 2 -> 5

    Quickselect, partition until pivot = k, left side all > k

    Time: O(n) -> optimized from O(n log k) min heap solution
    Space: O(1)
*/

// class Solution {
// public:
//     int findKthLargest(vector<int>& nums, int k) {
//         priority_queue<int, vector<int>, greater<int>> pq;
//         for (int i = 0; i < nums.size(); i++) {
//             pq.push(nums[i]);
//             if (pq.size() > k) {
//                 pq.pop();
//             }
//         }
//         return pq.top();
//     }
// };

/*
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int low = 0;
        int high = nums.size() - 1;
        int pivotIndex = nums.size();
        
        while (pivotIndex != k - 1) {
            pivotIndex = partition(nums, low, high);
            if (pivotIndex < k - 1) {
                low = pivotIndex + 1;
            } else {
                high = pivotIndex - 1;
            }
        }
        
        return nums[k - 1];
    }
private:
    int partition(vector<int>& nums, int low, int high) {
        int pivot = nums[low];
        
        int i = low + 1;
        int j = high;
        
        while (i <= j) {
            if (nums[i] < pivot && pivot < nums[j]) {
                swap(nums[i], nums[j]);
                i++;
                j--;
            }
            if (nums[i] >= pivot) {
                i++;
            }
            if (pivot >= nums[j]) {
                j--;
            }
        }
        
        swap(nums[low], nums[j]);
        return j;
    }
};
*/

// Video's QuickSelect implementation
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int index = nums.size() - k;
        return quickSelect(nums, index, 0, nums.size() - 1);
    }
private:
    int quickSelect(vector<int>& nums, int k, int l, int r){
        int pivot = nums[r];
        int p_pos = l;
        for (int i = l; i < r; ++i){
            if (nums[i] <= pivot){
                swap(nums[i], nums[p_pos]);
                ++p_pos;
            }
        }
        swap(nums[p_pos], nums[r]);
        if (k < p_pos)
            return quickSelect(nums, k, l, p_pos - 1);
        if (k > p_pos)
            return quickSelect(nums, k, p_pos + 1, r);
        return nums[p_pos];
    }
};
