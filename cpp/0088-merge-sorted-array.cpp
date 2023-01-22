class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int j=0;
        int i=0;
        if(n==0) return;
        if(m==0)
        {  
         for(int i = 0; i < n; i++){
                nums1[i] = nums2[i];
            } return;
        } 
        while(i<m)
        {
            if(nums1[i]>nums2[j])
            {
                swap(nums1[i],nums2[j]);
                sort(nums2.begin(),nums2.end());
            }
            i++;
        }
        j=0;
        while(i<m+n)
        {
            nums1[i] = nums2[j];
            j++;
            i++;
        }
        
    }
};
