class Solution {
public:
    int trap(vector<int>& height) {
        int left=0,right=height.size()-1,leftmax=0,rightmax=0,ans=0;
        while(left<right){
            if(leftmax>height[left]){
                ans+=leftmax-height[left];
                left++;
                continue;
            }else {
                  leftmax=height[left];
            }
            if(rightmax>height[right]){

                ans+=(rightmax-height[right]);
                right--;
                continue;
            }else {
                 rightmax=height[right];
            }
                
            if(leftmax<rightmax)
                left++;
            else
                right--;
        }
        return ans;
    }
};
