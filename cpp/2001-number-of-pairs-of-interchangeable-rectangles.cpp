/*
    Approach: 
    Keep the track of the ratios in a hash map
    
    Time complexity : O(n)
    Space complexity: O(n)

    n is number of rectangles
*/

class Solution {
public:
    long long interchangeableRectangles(vector<vector<int>>& rectangles) {
        
        map<long double,int> hash;
        long double ratio;

        long long answer=0;

        for(int i=0;i<rectangles.size();i++){
            ratio = (long double)(rectangles[i][0])/
                    (long double)(rectangles[i][1]);
            
            if(hash.find(ratio)!=hash.end()){
                hash[ratio]++;
            }
            else{
                hash[ratio] = 1;
            }
        }

        for(auto it:hash){
            answer+= (long long)(it.second)*(long long)(it.second-1)/2;
        }

        return answer;
    }
};