class Solution {
public:
    vector<string> findRelativeRanks(vector<int>& score) {
        vector<string> res(score.size());
        vector<pair<int,int>> rel_rank;

        for(int i=0; i<score.size(); i++){
            rel_rank.push_back({score[i],i});
        }
        sort(rel_rank.begin(), rel_rank.end(),[](pair<int,int>a,pair<int,int>b){return a.first>b.first;});

        for(int i = 0; i<rel_rank.size(); i++){
            if(i == 0) res[rel_rank[i].second] = "Gold Medal";
            else if(i == 1) res[rel_rank[i].second] = "Silver Medal";
            else if(i == 2) res[rel_rank[i].second] = "Bronze Medal";
            else{
                res[rel_rank[i].second] = to_string(i+1);
            } 
        }
        return res;
    }
};
