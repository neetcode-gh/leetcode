class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> stk;

        for (auto ast: asteroids)
        {
            while (!stk.empty() && stk.back() > 0 && ast < 0)
            {
                int diff = ast + stk.back();
                if (diff > 0)
                {
                    ast = 0;
                }
                else if (diff < 0)
                {
                    stk.pop_back();
                }
                else
                {
                    ast = 0;
                    stk.pop_back();
                } 
            }
            if (ast != 0)
                stk.push_back(ast);
        }
        return stk;
    }
};
