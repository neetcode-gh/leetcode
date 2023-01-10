 /*
    Approach: 
    Store the count of the end of the brick for each row in a hash and keep the track
    of max number of brick that ends at same position, return rows - max.
    
    Time complexity : O(n x m)
    Space complexity: O(n x m)

    n is number of rows, m is max brick in a row.
*/

class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {

        map<int,int> end_count;
        int end_of_brick, max_end_count=0;

        int rows = wall.size(),cols;

        for(int i =0;i<rows;i++){
            end_of_brick = 0;

            // '-1' because edge of the wall is not considered
            cols = wall[i].size() -1;
            for(int j =0;j<cols;j++){
                end_of_brick += wall[i][j];

                if(end_count.find(end_of_brick)!=end_count.end())
                {
                    end_count[end_of_brick]++;
                }
                else{
                    end_count[end_of_brick] = 1;
                }
                max_end_count = max(max_end_count,end_count[end_of_brick]);
            }
        }

        return rows - max_end_count;
    }
};