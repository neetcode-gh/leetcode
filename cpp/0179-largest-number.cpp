class Solution {
public:

    // to check which should come first
    // see that by adding in which way gives bigger number
    static bool mysort(string a, string b){
        return a+b > b+a;
    }
    string largestNumber(vector<int>& nums) {
        string s = "";
        vector<string> all_numbers;
        
        // convert every number to string
        for(int it: nums){
            all_numbers.push_back(to_string(it));
        }

        // sort accoring to custom sort function
        sort(all_numbers.begin(),all_numbers.end(),mysort);
        if(all_numbers[0]=="0"){
            return "0";
        }
        
        for(string a: all_numbers){
            s += a;
        }
        return s;
    }
};