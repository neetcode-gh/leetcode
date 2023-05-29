/*
Using Sliding window.
First we calculate sum of first k elements in vector then we check if the average is greater than or equal to the threshold.
If the condition is met then we append the res variable.
Then we maintain the k size window and traverse over the vector and check for the condition.

Since we are traversing only once
T.C -> O(N)
S.c -> O(1)
*/
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int sum = 0;
        int n = arr.size();
        for(int i=0;i<k;i++){
            sum += arr[i];
        }
        int left = 0;
        int right = k;
        int res = 0;
        if(sum/k >= threshold) res++;
        while(right < n){
            sum -= arr[left++];
            sum += arr[right++];
            if(sum/k >= threshold) res++;
        }
        return res;
    }
};