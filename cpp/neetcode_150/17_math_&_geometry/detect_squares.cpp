/*
    Given stream of points, add new points, return count of squares

    Find diagonals, if exists then forms a square, loop thru all points

    Time: O(1) add O(n^2) count -> n = number of points
    Space: O(n)
*/

class DetectSquares {
public:
    DetectSquares() {
        
    }
    
    void add(vector<int> point) {
        points[point[0]][point[1]]++;
    }
    
    int count(vector<int> point) {
        int x1 = point[0];
        int y1 = point[1];
        
        int result = 0;
        
        for (auto x = points.begin(); x != points.end(); x++) {
            unordered_map<int, int> yPoints = x->second;
            for (auto y = yPoints.begin(); y != yPoints.end(); y++) {
                int x3 = x->first;
                int y3 = y->first;
                
                // skip points on same x-axis or y-axis
                if (abs(x3 - x1) == 0 || abs(x3 - x1) != abs(y3 - y1)) {
                    continue;
                }
                
                result += points[x3][y3] * points[x1][y3] * points[x3][y1];
            }
        }
        
        return result;
    }
private:
    // {x -> {y -> count}}
    unordered_map<int, unordered_map<int, int>> points;
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * DetectSquares* obj = new DetectSquares();
 * obj->add(point);
 * int param_2 = obj->count(point);
 */
