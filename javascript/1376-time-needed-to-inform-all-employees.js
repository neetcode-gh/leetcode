/**
 * DFS | Tree 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/time-needed-to-inform-all-employees/
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
    
    const tree = {};
    for (let i = 0; i < manager.length; i++) {

        if (manager[i] === -1) continue;

        const senior = manager[i];
        const junior = i;

        if (!tree[senior]) {
            tree[senior] = [];
        }

        tree[senior].push(junior);
    }


    let time = 0;
    const dfs = (node, totalTime) => {
        if (tree[node] === undefined) {
            time = Math.max(time, totalTime);
            return;
        }

        const subordinates = tree[node];

        for (let i = 0; i < subordinates.length; i++)  {
            const subordinate = subordinates[i];
            dfs(subordinate, totalTime + informTime[node]);
        }
    }

    dfs(headID, 0);

    return time;
};
