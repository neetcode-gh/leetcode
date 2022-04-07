class Solution {
public:
    int maxArea(vector<int>& height) {
        int i=0,j=height.size()-1;
        int maxA=0,minh;
        while(i<j)
        {
            minh=min(height[i],height[j]);
            if(minh*(j-i)>maxA)
                maxA=minh*(j-i);
           if(minh==height[i]) 
               i++;
            else
                j--;
        }
        return maxA;
    }
};
