/*
    n cars 1 road, diff pos/speeds, faster cars slow down -> car fleet, return # fleets
    Ex. target = 12, pos = [10,8,0,5,3], speeds = [2,4,1,1,3] -> 3 (10 & 8, 0, 5 & 3)

    Sort by start pos, calculate time for each car to finish, loop backwards
    If car behind finishes faster then catches up to fleet, else creates new fleet

    Time: O(n log n)
    Speed: O(n)
*/

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        vector<pair<int, double>> vec;
        for(int i = 0; i < position.size(); i++){
            double time = (double)(target - position[i])/speed[i];
            vec.push_back({position[i], time});
        }
        
        sort(vec.begin(), vec.end());
        
        stack<double> s;
        
        for(int i = 0; i < position.size(); i++){
            double time = vec[i].second;

            while(!s.empty() && time >= s.top()){
                s.pop();
            }

            s.push(time);
        }
        return s.size();
    }
};

