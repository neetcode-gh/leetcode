class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int answer = 0;

        int secondMostRecentZero = -1;
        int mostRecentZero = -1;

        for(int i = 0; i < nums.size(); i++) {

            if(nums[i] == 0) {
                secondMostRecentZero = mostRecentZero;
                mostRecentZero = i;
            }

            // for any i, the longest sequence ending at i is
            // the distance from the second most recent zero
            // since the most recent can be thought of as flipped
            answer = max(answer, i-secondMostRecentZero);
        }

        return answer;
    }
};