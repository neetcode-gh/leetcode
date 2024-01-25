// problem link https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array
// time complexity O(n)

var findDisappearedNumbers = function(nums) {
    
    const numberSet = new Set();

    for(let i = 1; i < nums.length + 1; i++) {
        numberSet.add(i);
    }

    nums.forEach((element) => {
        if(numberSet.has(element)) {
            numberSet.delete(element);
        }
    });

    return Array.from(numberSet);
};

//Optimized Solution for Follow-up

//time complexity O(n) , space complexity O(1)

var findDisappearedNumbers = function(nums) {
    for(let i = 0; i < nums.length; i++) {
        let curr  = Math.abs(nums[i])
        let idx = curr - 1
        if(nums[idx] > 0) {
            nums[idx] = nums[idx] * (-1)
        }
    }
    let res = []
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] > 0) {
            res.push(i + 1)
        }
    }
    return res
};

// For each value in the array mark its presence by making the number negative at that place in array
// eg. if you hae array [3,1,4,1] for 3, i will go to index 2 and make its value negative ie. now nums[2] becomes -4. present array: [3,1,-4,1]
// for 1, i will go to index 0 and make its value negative ie. now nums[0] becomes -3. present array: [-3,1,-4,1]
// for 4, (take abs value), i will go to index 3 and make its value negative ie. now nums[3] becomes -1. present array: [-3,1,-4,-1]
// for 1 take abs value), i will go to index 0 as it is already -ve do nothing. present array: [-3,1,-4,-1]
// At last I will have [-3,1,-4,-1]. now i will iterate over the array, whichever idx has positive value that number will not be in the array so as we have nums[1]>0 so 2 is not in the list.
