
/*
    Given a 1-indexed sorted int array & target:
    Return indices (added by 1) of 2 nums that add to target
    2 pointers, outside in, iterate i/j if sum is too low/high
    Time: O(n)
    Space: O(1)
*/

int* twoSum(int* numbers, int numbersSize, int target, int* returnSize){
    *returnSize = 2;
    int* ans = malloc(sizeof(int)*2);
    
    int i = 0;
    int j = numbersSize-1;
    int k;
    while (true) {
        k = numbers[i]+numbers[j]-target;
        if (k==0) { // numbers[i]+numbers[j] = target
            ans[0] = i+1;
            ans[1] = j+1;
            return ans;
        } else if (k>0) // numbers[i]+numbers[j] > target
            j--;
        else // numbers[i]+numbers[j] < target
            i++;
    }
}
