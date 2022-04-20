class Solution {
public:
    bool canJump(vector<int>& nums) {
        int len = nums.size(), tar=0, maxTar=0;
        int i = 0;
        if (len == 1)   
            return true;
        for (i=0; i<len; i++) {
            if (i<=maxTar) {
                if (maxTar>=len-1)
                    return true;
                tar = i + nums[i];
                maxTar = max(maxTar, tar);
            }
        }
        return false;
    }
};