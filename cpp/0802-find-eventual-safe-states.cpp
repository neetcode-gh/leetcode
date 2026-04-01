class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        vector<int> ans;
        int n=graph.size();
        vector<vector<int>>adj(n);
        for(int i=0;i<n;i++){
            for(auto j:graph[i]){
                adj[j].push_back(i);
            }
        }
        vector<int> in(n,0);
        for(auto i:adj){
            for(auto j:i)in[j]++;
        }
        queue<int> q;
        for(int i=0;i<n;i++){
            if(in[i]==0)q.push(i);
        }
        while(!q.empty()){
            auto k=q.front();
            q.pop();
            ans.push_back(k);
            for(auto j:adj[k]){
                in[j]--;
                if(in[j]==0)q.push(j);
            }
        }
        sort(ans.begin(),ans.end());
        return ans;
    }
};