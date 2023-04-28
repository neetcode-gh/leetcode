typedef unsigned long long ll;
class Solution {
public:
    bool solve(string & s , ll last , int index,int cnt){

        if(index >= s.size()) return cnt > 1;

        ll num = 0;
        bool ret = false;

        for(int i = index ; i < s.size() ; i++){
            num = num * 10;
            num += (s[i] - '0');

            if(last == -1 || last == num + 1){
                ret |= solve(s , num , i + 1 , cnt + 1);
            }else if(last != -1 && num >= last)break;
        }

        return ret;
    }
    bool splitString(string s) {
        return solve(s,-1,0,0);
    }
};
