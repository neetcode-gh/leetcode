class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        // Preprocessing
        // Polulate a smallest from beginning array
        // Polulate a largest from the end array
        vector<int> smallest(n, -1), largest(n, -1);
        
        smallest[0] = prices[0];
        largest[n-1] = prices[n-1];
        
        for (int i = 1; i < n; i++) {
            smallest[i] = min(smallest[i-1], prices[i]);
        }
        
        for (int i = n-2; i>=0; i--) {
            largest[i] = max(largest[i+1], prices[i]); 
        }
        
        // Logic
        // Max difference b/w the smallest and largest element 
        int res = 0;
        for(int i=0; i<n; i++) res = max(res, largest[i]-smallest[i]);
        
        return res;
        
    }       
};