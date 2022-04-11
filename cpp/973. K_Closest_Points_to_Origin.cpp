class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        
        int n=points.size();
        int i;
        vector<vector<int>>ans;
        priority_queue<pair<double,pair<int,int>>>maxHeap;
        
        for(i=0;i<n;i++)
        {
            double distance=sqrt(pow(points[i][0],2)+pow(points[i][1],2));
            
            maxHeap.push({distance,{points[i][0],points[i][1]}});
            if(maxHeap.size()>k)
            {
                maxHeap.pop();
            }
        }
        while(!maxHeap.empty())
        {
            vector<int>temp;
            temp.push_back(maxHeap.top().second.first);
            temp.push_back(maxHeap.top().second.second);
            ans.push_back(temp);
            maxHeap.pop();
        }
        return ans;
    }
};
