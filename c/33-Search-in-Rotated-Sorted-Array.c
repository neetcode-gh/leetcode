int findPivotIndex(int* nums, int numsSize)
{
        int s = 0;
        int e = numsSize;
        
        while(s <= e){
            
            int m = s + (e - s)/2;
            
            if(m < e && nums[m] > nums[m+1]){
                return m;
            }
            else if(s < m && nums[m] < nums[m-1]){
                return m - 1;
            }
            else if(nums[s] < nums[m]){
                s = m + 1;
            }
            else if(nums[s] >= nums[m]){
                e = m - 1;
            }
        }
        
        // If the array is not rotated then last position will be the pivot element.
    
        return numsSize;
}

int binarySearch(int *nums, int s, int e, int target)
{
    while(s <= e){
            
            int m = s + (e - s)/2;
            
            if(nums[m] == target){
                return m;
            }
            else if(nums[m] < target){
                s = m + 1;
            }
            else{
                e = m - 1;
            }
        }
        
        return -1;
}

int search(int* nums, int numsSize, int target){
    
    int n = numsSize - 1;
        
    int pivotIndex = findPivotIndex(nums, n);

    int firstTry = binarySearch(nums, 0, pivotIndex, target);

    if(firstTry != -1){
        return firstTry;
    }

    return binarySearch(nums, pivotIndex + 1, n, target);
}