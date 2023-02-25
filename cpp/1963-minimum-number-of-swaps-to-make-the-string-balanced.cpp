/*
    Approach: 
    Just check which '[' brackes are wrongly placed correct that bracket.
    use stack to keep track of bracket
    
    Time complexity : O(n)
    Space complexity: O(n)

    n is length of the string. 
*/

class Solution {
public:
    int minSwaps(string s) {

        int answer=0;

        stack<char> stc;
        stc.push(']'); 

        int n = s.size();

        for(int i=0;i<n;i++){
            char top = stc.top();

            if(s[i]==']'){

                // is the '[' bracket correctly placed
                // if yes then just pop
                if (top=='[') {
                    stc.pop();
                }
                // if '[' is not correctly placed 
                // then correct it (push '[') 
                else{ 
                    stc.push('[');
                    answer++;
                }
            }
            else{
                stc.push('[');
            }
        }
        return answer;
    }
};