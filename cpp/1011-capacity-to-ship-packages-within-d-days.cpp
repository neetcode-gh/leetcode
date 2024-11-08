/*
    Shipping capacity at the least needs to be
    as much as the highest weight on the conveyor
    belt and at the maximum can be total of all 
    the weights on the conveyor belt. 

    
    Time Complexity -> O(nlogn)
    Space Complexity -> O(1)
*/
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {

        int high = 0;
        int low = 0;
        
        for (int i = 0; i < weights.size(); i++) {
            high += weights[i];
            low = max(low, weights[i]);
        }
        
        int answer = high;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canShipWithinDays(weights, days, mid)) {
                high = mid - 1;
                answer = min(answer, mid);
            } else low = mid + 1;
            
        }

        return answer;
    }

private:
    bool canShipWithinDays(vector<int>&weights, int days, int max) {
        int sum = 0;
        
        for (int i = 0; i < weights.size() - 1; i++) {
            sum += weights[i];
            
            if (sum + weights[i + 1] > max) {
                sum = 0;
                days--;
            }
        }

        return days > 0;
    }
};
