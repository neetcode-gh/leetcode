class Solution {
public:
    int myAtoi(string s) {
        long ans = 0;
        int n = s.size();
        bool flag=1;
        int i=0;
        while(i<n && s[i] == ' '){
            i++;
        }
        if(i<n && (s[i] == '+' || s[i] == '-')){
            flag = (s[i] == '+');
            i++;
        }
        while(i<n && s[i] >= '0' && s[i] <= '9'){
            int num = s[i] - '0';
            ans = ans*10 + num;
            if(ans > INT_MAX){
                if(flag){
                    return INT_MAX;
                } 
                else{
                    return INT_MIN;
                }
            }
            i++;
        }
        if(!flag){
            ans = -ans;
        }
        return int(ans);
    }
};
