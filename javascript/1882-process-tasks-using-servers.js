/**
 * MinPriorityQueue | Simulation
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/process-tasks-using-servers/
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    
    const toBeCompleted = new MinPriorityQueue({
        compare: (a, b) => {
            if (a[0] === b[0]) return a[1] - b[1];
            return a[0] - b[0];
        }
    });

    const freeServers = new MinPriorityQueue({
        compare: (a, b) => {
            if (a[0] === b[0]) return a[1] - b[1];
            return a[0] - b[0];
        }
    });

    for (let i = 0; i < servers.length; i++) {
        const weight = servers[i];
        const idx = i;
        freeServers.enqueue([weight, idx]);
    }

    let sec = 0;
    const result = [];

    for (let i = 0; i < tasks.length; i++) {
        sec = Math.max(i, sec);

        // if the we don't have server available then jump to the next imidiate 
        // time when the server will be available.
        if (freeServers.isEmpty()) {
            sec = toBeCompleted.front()[0];
        }
         while (!toBeCompleted.isEmpty() && 
              toBeCompleted.front()[0] <= sec) {
            const [endTime, serverIdx] = toBeCompleted.dequeue();
            const weight = servers[serverIdx];
            freeServers.enqueue([weight, serverIdx]);
        }

        const [weight, serverIdx] = freeServers.dequeue();
        const timeToBeTaken = tasks[i];
        result.push(serverIdx);
        toBeCompleted.enqueue([sec+timeToBeTaken, serverIdx]);
    }

    return result;
};
