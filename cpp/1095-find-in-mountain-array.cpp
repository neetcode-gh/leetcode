/**
 *  Description:
 *      (This problem is an interactive problem.)
 *  
 *      You may recall that an array arr is a mountain array if and only if:
 *          arr.length >= 3
 *          There exists some i with 0 < i < arr.length - 1 such that:
 *              arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
 *              arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
 *  
 *      Given a mountain array mountainArr, return the minimum index such that 
 *      mountainArr.get(index) == target. If such an index does not exist, return -1.
 *  
 *      You cannot access the mountain array directly. You may only access the array using 
 *      a MountainArray interface:
 *          MountainArray.get(k) returns the element of the array at index k (0-indexed).
 *          MountainArray.length() returns the length of the array.
 *  
 *      Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer. 
 *      Also, any solutions that attempt to circumvent the judge will result in disqualification.
 *  
 *      Ex1.
 *          Input: array = [1,2,3,4,5,3,1], target = 3
 *          Output: 2
 *          Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, 
 *          which is 2.
 *  
 *      Ex2.
 *          Input: array = [0,1,2,4,2,1], target = 3
 *          Output: -1
 *          Explanation: 3 does not exist in the array, so we return -1.
 * 
 *  Algorithm:
 *      1. The algorithm's goal is to find the minimum index at which the value "target",
 *         exist within a "MountainArray".
 *      2. It employs a binary search approach, dividing the array into ascending and 
 *         descending halves.Additionally, it identifies the peak index to determine the
 *         transition from ascending to descending.
 * 
 *  Time Complexity: O(log n) 
 *  Space Complexity: O(1)
 */

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */

class Solution {
public:
    int binarySearch(int& begin, int& end, const int& target, MountainArray &mountainArr)
    {
        while (begin <= end)
        {
            int mid = begin + (end-begin)/2;
            int mid_number = mountainArr.get(mid);

            if(mid_number == target)
            {
                return mid;
            }
            else if (mid_number > target)
            {
                end = --mid;
            }
            else
            {
                begin = ++mid;
            }
        }
        return -1;
    }

    int reverseBinarySearch(int& begin, int& end, const int& target, MountainArray &mountainArr)
    {
        while (begin <= end)
        {
            int mid = begin + (end-begin)/2;
            int mid_number = mountainArr.get(mid);

            if(mid_number == target)
            {
                return mid;
            }
            else if (mid_number > target)
            {
                begin = ++mid;
            }
            else
            {
                end = --mid;
            }
        }
        return -1;
    }

    int findPeakElement(int& begin, int& end, MountainArray &mountainArr)
    {
        while (begin < end)
        {
            int mid = begin + (end-begin)/2;
            if(mountainArr.get(mid) < mountainArr.get(mid+1))
            {
                begin = ++mid;
            }
            else
            {
                end = --mid;
            }
        }
        return begin;
    }

    int findInMountainArray(int target, MountainArray &mountainArr) {
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);

        int begin = 0; 
        int end = mountainArr.length()-1;
        int minimum_index = 0;

        int peak_index = findPeakElement(begin, end, mountainArr);

        begin = 0; 
        end = peak_index;   
        minimum_index = binarySearch(begin, end, target, mountainArr);

        if(minimum_index != -1) return minimum_index;
        
        begin = peak_index;
        end = mountainArr.length()-1;
        minimum_index = reverseBinarySearch(begin, end, target, mountainArr);

        return minimum_index;
    }
};