/**
 * PriorityQueue
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/longest-happy-string/
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function(a, b, c) {
    
    const maxQ = new MaxPriorityQueue({
        compare: (a,b) => {
            return b[0]-a[0];
        }
    });

    a && maxQ.enqueue([a, "a"]);
    b && maxQ.enqueue([b, "b"]);
    c && maxQ.enqueue([c, "c"]);

    let happyStr = "";
    
    while(!maxQ.isEmpty()) {

        let [count, char] = maxQ.dequeue();   

        if(happyStr[happyStr.length - 1] === char &&
           happyStr[happyStr.length - 2] === char) {
            
            if(!maxQ.isEmpty()) {
                let [count1, char1] = maxQ.dequeue();

                happyStr += char1;
                count1--;

                count1 && maxQ.enqueue([count1, char1]);
                maxQ.enqueue([count, char]);
            }   
        } else {
            
            if(count >= 2) {
                happyStr += char.repeat(2);
                count -= 2;
            } else {
                happyStr += char;
                count--;
            }

            count && maxQ.enqueue([count, char]);
        }
    }

    return happyStr;
};
