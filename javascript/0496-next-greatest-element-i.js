var nextGreaterElement = function(nums1, nums2) {
    // O (n + m)
    let nums1Idx = new Map(); {
        let idx = 0;
        for(const n of nums1)
            nums1Idx.set(n, idx++);
    }
    let res = [];
    for(let i = 0; i < nums1.length; i++)
        res.push(-1);
    
    let stack = [];
    for(let i = 0; i < nums2.length; i++) {
        let cur = nums2[i];
        
        // while stack is not empty and current is greater than the top of the stack
        while(stack.length > 0 && cur > stack[stack.length - 1]) {
            let val = stack.pop();
            let idx = nums1Idx.get(val);
            res[idx] = cur;
        }
        
        if(nums1Idx.has(cur))
            stack.push(cur);
    }
    
    return res;
};
