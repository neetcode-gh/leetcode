function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums2.length < nums1.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    let [left, right] = [0, nums1.length - 1];
    const totalLength = nums1.length + nums2.length;
    const mid = totalLength >> 1;
    const isEven = (totalLength % 2) === 0;
    
    while (true) {
        const mid1 = left + right;
        const mid2 = (mid - mid1) - 2;
        
        const getLeft = (nums, index) => 0 <= index ? nums[index] : -Infinity;
        const getRight = (nums, index) => (index + 1) < nums.length ? nums[index + 1] : Infinity;
        const [aLeft, bLeft] = [getLeft(nums1, mid1), getLeft(nums2, mid2)];
        const [aRight, bRight] = [getRight(nums1, mid1), getRight(nums2, mid2)];
        
        if ((aLeft <= bRight) && (bLeft <= aRight)) {
            return isEven ? (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2 : Math.min(aRight, bRight);
        }
        
        if (aLeft <= bRight) {
            left = mid1 + 1;
        }
        
        if (bRight < aLeft) {
            right = mid1 - 1;
        }
        
    }
};