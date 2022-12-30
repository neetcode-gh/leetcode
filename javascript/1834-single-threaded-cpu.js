/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function(tasks) {
    for(let i = 0; i < tasks.length; i++) tasks[i].push(i);
    tasks.sort((a, b) => a[0] - b[0]);
    const pq = new MinPriorityQueue({
        compare: (e1, e2) => {
            if(e1[1] === e2[1]) return e1[2] - e2[2];
            return e1[1] - e2[1];
        }
    });
    const a = [];
    let t = tasks[0][0], i = 0;
    while(pq.size() || i < tasks.length){
        while(i < tasks.length && t >= tasks[i][0]){
            pq.enqueue(tasks[i]);
            i++;
        }
        if(pq.size()){
            let e = pq.dequeue();
            a.push(e[2]);
            t += e[1];
        }
        else t = tasks[i][0];
    }
    return a;
};