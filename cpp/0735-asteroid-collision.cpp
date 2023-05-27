/*same concept like checking for valid paranthesis
if a +ve no. appears push it in stack
and check for conditions when the first negative no. appears

i maintained two vectors t1(for negative elements) and t2(for +ve)
while iterating through a -ve element and stack is empty eg.[-1 -2 -10]
t2 will contain the elements of stack after all collisions in reverse order
if both are not empty return a merged version of them
*/



class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
    int n=asteroids.size();
    stack<int> st;
    vector<int> t1;    
    for(int i=0;i<n;i++){
        if(asteroids[i]>0)st.push(asteroids[i]);
        else{
            if(st.empty())t1.push_back(asteroids[i]);
            else{
                if(st.top()>abs(asteroids[i]))continue;
                else if(st.top()<abs(asteroids[i])){
                    st.pop();
                    i--;
                    continue;
                }
                else{
                    st.pop();
                    continue;
                }
            }
        }
    }
    vector<int> t2;
    while(!st.empty()){
        t2.push_back(st.top());
        st.pop();
    }

    if(t1.size()==0){
        reverse(t2.begin(),t2.end());
        return t2;

    }else if(t2.size()==0){
        return t1;
    }
    else if(t1.size() !=0 && t2.size() !=0){
        reverse(t2.begin(),t2.end());
        t1.insert(t1.end(),t2.begin(),t2.end());
        return t1;
    }
    return asteroids; // this line of code will never be executed added just to avoid compilation error
    
    }
};