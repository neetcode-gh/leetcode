    var permute = function(nums) {
        // base case
        if(nums.length === 1) {
            // return it as an array within an array, so it can be iterated over
            return [nums.slice()];
        };

        // this holds our final result
        let placements = [];

        for(let i = 0; i < nums.length; i++) {
            const n = nums.shift(0);    // <- remove first element

            let perms = permute(nums);  // <- permute again
            
            // to each element, push the number popped at the top
            for(let perm of perms) {
                perm.push(n);
            };

            // spread a copy of the outcome into our final array
            placements.push(...perms.slice());

            // push the number back in for the next iteration
            nums.push(n);
        };

        return placements;
    };
