var longestConsecutive = function(nums) {
    
    if(nums.length == 0) return 0;
     const mySet = new Set();
    
     nums.forEach((num) => {
    
        mySet.add(num);
     });
    
     let maxSequnce = 1;
     let curruntMax = 1;
    
     nums.forEach((num) => {
        console.log(!mySet.has(num - 1));
        if(!mySet.has(num - 1)) {
            let currunt = num;
            while(mySet.has(++currunt)) {
                curruntMax++;
                maxSequnce = Math.max(curruntMax, maxSequnce);
            }
        }
        curruntMax = 1;
     });
    
    return maxSequnce;
    };
    // 1 2 3 4 5
    const nums = [0,3,7,2,5,8,4,6,0,1];
    
    console.log(longestConsecutive(nums));
