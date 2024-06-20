function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let map = new Map()
    for(let i = 0; i < nums.length; i++){
        if(!map.has(nums[i])){
            map.set(nums[i], i)
        }else{
            if(i - map.get(nums[i]) <= k){
                return true
            }else{
                map.set(nums[i], i)
            }
        }
    }
    return false
};
