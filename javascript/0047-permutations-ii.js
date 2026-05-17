/**
 * Brute Force | HashSet
 * Time O(n^n) | Space O(n!)
 * https://leetcode.com/problems/permutations-ii/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {

    const addPerm = (arr, ans) => {
        const perm = [];
        for(let i = 0; i < arr.length; i++) {
            perm.push(nums[arr[i]]);
        }
        
        ans.push(perm);
    }

    const makeUnique = (ans) => {
        
        let uniquePerm = new Set();
        for(let i = 0; i < ans.length; i++) {
            uniquePerm.add(ans[i].join("#"));
        }

        uniquePerm = [...uniquePerm];
        ans = [];

        for(let i = 0; i < uniquePerm.length; i++) {
            const perm = uniquePerm[i].split("#").map((num) => +num);
            ans.push(perm);
        }

        return ans;
    }

    const dfs = (visited, ans) => {
        if(visited.size === nums.length) {
            addPerm([...visited], ans);
            return ans;
        }

        for(let i = 0; i < nums.length; i++) {
            if(!visited.has(i)) {
                visited.add(i);
                dfs(visited, ans);
                visited.delete(i);
            }
        }

        return ans;
    }

    const ans = dfs(new Set(), []);
    return makeUnique(ans);    
};
