//////////////////////////////////////////////////////////////////////////////
// Linear Search With A Hash Map
// Time: O(n)
// Space: O(n)
// This solution only makes one pass over the `nums` array and is the highest
// performing solution.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
   
   if (!nums.length) {
       return 0;
   }
   
   const map = Object.create(null);
   let max = 0;
   
   for (const num of nums) {
       
       if (num in map) {
	   continue;
       }
       
       const prev = num - 1;
       const next = num + 1;
       let len = 1;
       
       if (prev in map) {
	   if (next in map) {
	       len += map[prev] + map[next];
	       map[prev - map[prev] + 1] = len;
	       map[next + map[next] - 1] = len;
	   } else {
	       len += map[prev];
	       ++map[prev - map[prev] + 1];
	   }
       } else if (next in map) {
	   len += map[next];
	   ++map[next + map[next] - 1];
       }
       map[num] = len;
       max = Math.max(max, len);
   }
   
   return max;
}

//////////////////////////////////////////////////////////////////////////////
// Linear Search With A Hash Set
// Time: O(n)
// Space: O(n)
// This solution does three passes over the `nums` array. A first pass to
// setup the hash set. A second pass to find the numbers that mark the
// beginning of a sequence. A third pass to calculate the length of each
// sequence. The nested `while` loop does not cause quadratic calculations as
// it is only initiated on the first number of each sequence.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {

    const set = new Set(nums);
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        if (set.has(num - 1)) {
            continue;
        }

        let currentMax = 1;
        while (set.has(num + currentMax)) {
            currentMax++;
        }

        if (currentMax > max) {
            max = currentMax;
        }
    }

    return max;
}
