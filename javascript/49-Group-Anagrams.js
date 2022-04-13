var groupAnagrams = function(strs) {
    

    const result = [];
    const myHash = new Map();

    strs.forEach((word) => {

        let newHash = new Array(26).fill(0);
        [...word].forEach((char) => {
            // console.log(char.charCodeAt(0) - 'a'.charCodeAt(0));
            newHash[char.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
            console.log(newHash);
        });
        
        // making an array into string
        newHash = newHash.join('-');
        // console.log(newHash);
        if(!myHash.has(newHash)) {
            // console.log(newHash, 'if');
            myHash.set(newHash,[word]);
        } else {
            // console.log(newHash);
            myHash.set(newHash, [...myHash.get(newHash), word]);
        }
    });

    console.log(myHash);
    for(let [key, value] of myHash) {
        result.push(myHash.get(key));
    }
    
    return result;
};
