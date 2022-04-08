class Solution {
public:
    struct cords {
        int x, y;
        cords(vector<int> a) {
            this -> x = a[0];
            this -> y = a[1];
        }
        cords(int x, int y){
            this -> x = x;
            this -> y = y;
        }
        int dist(){
            return x*x+y*y;
        }
    };
    
    struct compare {
        bool operator()(cords a, cords b) {
            return a.dist() < b.dist();
        }
    };
    
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<cords, vector<cords>, compare> pq;
        for (auto a: points) {
            pq.push(cords(a));
        }
        
        while (pq.size() > k) pq.pop();
        
        vector<vector<int>> res;
        while (!pq.empty()) {
            res.push_back({pq.top().x, pq.top().y});
            pq.pop();
        }
        return res;
    }
};