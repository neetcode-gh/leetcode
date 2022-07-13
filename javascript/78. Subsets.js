var subsets = function(nums) {
    let ans = new Array(), curr = [];
    ans.push([]);
    function backtracking(i){
        if(i >= nums.length)return;
        for(let j = i; j < nums.length; j++){
            curr.push(nums[j]);
            ans.push([...curr]);
            backtracking(j + 1);
            curr.pop();
        }
    }
    backtracking(0);
    return ans
};
