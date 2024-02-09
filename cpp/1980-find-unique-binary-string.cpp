/*
    This class implements a solution to find a binary string that differs from a given list of binary strings.
    
    Approach:
    1. Define a backtrack function to explore all possible binary strings of the same length as the input strings.
    2. Use a set to store the input strings to efficiently check for duplicates.
    3. Backtrack through all possible binary strings of length equal to the input strings.
    4. If a binary string is found that does not exist in the set of input strings, update the result and return.
    
    Variables:
    - res: Holds the result, initialized to an empty string.
    - backtrack(): Recursive function to generate binary strings and check for uniqueness.
    - nums: Input vector of binary strings.
    - curr: Current binary string being constructed during backtracking.
    - len: Length of binary strings in the input.
    - s: Set to store input binary strings for fast duplicate checking.

    Time Complexity: O(2^N * N), where N is the length of the binary strings.
        - The function 'backtrack' explores all possible binary strings of length N, which is O(2^N).
        - Checking for uniqueness in the set takes O(1) time on average.
    Space Complexity: O(2^N * N) considering the space required to store the generated binary strings during backtracking.
*/
class Solution {
public:
    string res="";
    void backtrack(vector<string>& nums,string& curr,int len,set<string>&s){
        if(res!="") return;
        if(curr.size()==len && s.find(curr)==s.end()){
            res=curr;
            return;
        }
        if(curr.size()>len) return;

        string ans;
        for(int i=48;i<50;i++){
            curr.push_back(char(i));
            backtrack(nums,curr,len,s);
            curr.pop_back();

        }
    }
    string findDifferentBinaryString(vector<string>& nums) {
        int len = nums[0].size();
        string curr="";
        set<string>s;
        for(auto &x:nums){
            s.insert(x);
        }

        backtrack(nums,curr,len,s);
        return res;
        
    }
};