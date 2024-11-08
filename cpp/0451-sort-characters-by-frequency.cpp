class Solution {
public:
    string frequencySort(string s) {
        //count the frequency / the big A and small A are different characters
        //the string cannot not be empty according to the question
        unordered_map<char, int> freq;
        for(char c: s){
            freq[c]++;
        }

        // Move it to the vector so we can sort it easily 
        vector<pair<char, int>> freq_v(freq.begin(), freq.end());
    
        // Sort the vector by the frequency
        sort(freq_v.begin(), freq_v.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.second > b.second;
        });

        // Create the answer string -> add the chars with their frequency 
        string ans = "";
        for(auto pair: freq_v){
            for(int i = 0; i < pair.second; i++){
                ans += pair.first;
            }
        }
        return ans;
    }
};
