class StockSpanner {
private:
  vector<int> v;
  vector<int> ans;
  stack<pair<int,int>> st;

public:
    StockSpanner() {
        
    }
    
    int next(int price) {
    v.push_back(price);
    int i= v.size()-1;
        if(st.empty())ans.push_back(i+1);       
        else{
            while(st.size()>0 && st.top().first<=v[i])st.pop();
            if(st.empty())ans.push_back(i+1);
            else ans.push_back(i-st.top().second);
        }
        st.push({v[i],i});
    
    return ans[ans.size()-1];
        
    }
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner* obj = new StockSpanner();
 * int param_1 = obj->next(price);
 */