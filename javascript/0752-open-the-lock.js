/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    
    // General approach:
    // Start at the end, mark that spot to be 0 away from target
    // Find all the valid neighbors through bfs, mark those as 1
    // Find all _their_ valid neighbors, mark those as ++ etc
    // Until we find 0000. Whatever we mark that as is the number. BFS will guarantee it's the shortest path
    
    let q = [target]; // our BFS Queue
    let mem = {};     // to keep track what we already have visited
    mem[target] = 0;  // starting distance of the end
    
    // Helper function that given a position, will generate all the numbers we
    // can create in 1 move;
    let getNextPositions = function (pos) {
        // one above, one below
        let dir = [-1, 1];
        let arr = pos.split('');
        let positions = [];
        let i, j;
        
        for (j = 0; j < 2; j++) {
            let next = '';
            // for each number in the position
            for (i = 0; i < 4; i++) {
                // logic is not just +1 -1, have to deal with wrapping around
                let n = (10 + parseInt(arr[i], 10) + dir[j]) % 10;
                // clone to not ruin our array for the next number
                let next = [...arr];
                // set our 1 change
                next[i] = n;
                positions.push(next.join(''));
            }
        }
        return positions;
    }
        
    while (q.length) {
        // dequeue a position to check out
        let pos = q.shift();
        
        // if it's 0000 we're done. BFS guarantees it's the shortest possible
        if (pos === '0000') {
            return mem[pos];
        } else {
            let next = getNextPositions(pos);
            next.forEach(function(n) {
                // if we haven't seen n before, and it's not a dead end,
                if (mem[n] === undefined && !deadends.includes(n)) {
                        // mark the distance and enqueue to check out next
                        mem[n] = mem[pos] + 1; 
                        q.push(n);
                }
            }) 
        }  
    }
    // if we end up here, we couldn't find it
    return -1;
};