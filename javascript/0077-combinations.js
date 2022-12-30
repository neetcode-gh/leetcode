/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const a = [], ans = [];
    const bt = (n1) => {
        if(a.length === k){
            ans.push([...a]);
            return;
        }
        for(let i = n1 + 1; i <= n; i++){
            a.push(i);
            bt(i);
            a.pop();
        }
    }
    bt(0);
    return ans;
};