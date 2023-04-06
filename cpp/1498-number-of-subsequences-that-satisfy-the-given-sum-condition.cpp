// Time Complexity - O(nlogn)
// Space Complexity - O(n)

class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();

        int left = 0, right = n - 1;
        int res = 0, mod = 1e9 + 7;
        while (left <= right) {
            if (nums[left] + nums[right] > target) {
                right--;
            } 
            else {
                res = (res + fastPower(2, right - left, mod)) % mod;
                left++;
            }
        }
        return res;
    }
    
    int fastPower(int a, int b, int mod) {
        long long ans = 1;
        long long base = a;
        while (b != 0) {
            if (b % 2 == 1) {
                ans = (ans * base) % mod;
            }
            base = (base * base) % mod;
            b /= 2;
        }
        return ans;
    }
};
