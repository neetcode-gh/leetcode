class Solution {
private:
    static bool st(string &a,string &b){
        if(a.size()==b.size()) return a<b;
        return a.size()<b.size();
    }
    
    
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        sort(nums.begin(),nums.end(),st);
        return nums[nums.size()-k];
        
    }
};
