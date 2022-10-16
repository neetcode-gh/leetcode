var nextGreaterElement = function(nums1, nums2) {
    
    const AnsArr = [];
    // burte force
    const myMap = new Map();
    
    nums2.forEach((num, index) => {
        myMap.set(num, index);
    });
    
    // burte force
    for(let i = 0; i < nums1.length; i++) {
        for(let j = myMap.get(nums1[i]); j < nums2.length; j++) {
            if(nums2[j] > nums1[i]) {
                AnsArr.push(nums2[j]);
                break;
            }
            if(j == nums2.length - 1) {
                AnsArr.push(-1);
            }
        }
    }
    
    return AnsArr;
};
