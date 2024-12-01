class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {

        int n = s.size();
        if(n <=10){ return {};}
        vector<string> answer;

        unordered_map<string,int> hash;

        for(int i = 0;i<=s.size()-10;i++){
            string ss = s.substr(i,10);
            hash[ss]++;
            if(hash[ss]==2){
                answer.push_back(ss);
            }
        }

        return answer;
    }
};