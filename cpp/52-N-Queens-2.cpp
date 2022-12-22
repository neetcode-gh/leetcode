class Solution {
public:
    int queen[9];
    bool check(int &r,int &c,int n){
        for(int i=0;i<r;i++){
            // here we have to check from before rows any queen(queen[i]) is placed to attk the cur level queen;
            int pre_row=i; // previous row
            int pre_col=queen[i]; // previous col is stored in queen[i]
            // checking for col collison as rows cant be && and for diagonal attk
            if(pre_col==c or abs(r-pre_row)==abs(c-pre_col)) return false;
        }
        return true;
    }
    int bt(int level,int n){
        // base conditon
        
        if(level==n) return 1;
        // return 1 as u made a board and placing queens from 0 to n-1 so u came out of board
        
        int ans=0;
        // exploring choices and computation
        for(int col=0;col<n;col++){
            if(check(level,col,n)){
                // check
                queen[level]=col;
                // move
                ans+=bt(level+1,n);
                queen[level]=-1;
            }
        }
        // return count of ways to place queen from this row to n-1/ last row
        return ans;
    }
    int totalNQueens(int n) {
        memset(queen,-1,sizeof(queen));
        return bt(0,n);
    }
};
