class StockSpanner {
public:
    
    stack<pair<int, int>> st;
    pair<int, int> pr;
    StockSpanner() {
        pr = {0, 0};
    }
    
    int next(int price) {

        int ret = 1;
        while (!st.empty() && price >= pr.first)
        {
            ret += pr.second;
            st.pop();
            if (!st.empty())
                pr = st.top();
        }
        st.push(make_pair(price, ret));
        pr = st.top();
        return (ret);
    }
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner* obj = new StockSpanner();
 * int param_1 = obj->next(price);
 */
