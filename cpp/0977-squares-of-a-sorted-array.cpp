/*
    Given an integer array nums sorted in non-decreasing order, return 
    an array of the squares of each number sorted in non-decreasing order.

    Ex. 
    Input: nums = [-4,-1,0,3,10]
    Output: [0,1,9,16,100]

    1.- Have 2 pointers one at start and one at end .
    2.- Compare squares and add which ever square is bigger at the end of new array .
    2.- Decrement the end pointer if its square is added or increment the start pointer if its square is added .

    Time: O(N) 
    Space: O(N)
*/




class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        
        int n = nums.size();
        int i=0;
        int j=n-1;
        vector<int> myVector ;

        while(i<=j){
            
            if(nums[i]*nums[i]<nums[j]*nums[j]){
                myVector.insert(myVector.begin(), nums[j]*nums[j]);
                j--;
            }

            else{
                myVector.insert(myVector.begin(), nums[i]*nums[i]);
                i++;
            }
        }

        return myVector;
    }
};
