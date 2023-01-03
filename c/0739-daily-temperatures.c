/*
    Given an array of temperatures, find the number of days after which the
    temperature becomes more than temperature of that day.
    
    Ex. temperatures = [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]

    Time: O(N)
    Space: O(1)
*/

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize){
    *returnSize = temperaturesSize;
    
    int* result = (int*) malloc(sizeof(int)*temperaturesSize);
    
    // Initialize result array to zero
    for (int i = 0; i < temperaturesSize; ++i)  result[i] = 0;
    

    for (int i = temperaturesSize-1; i >= 0; --i) {
        int j = i + 1;

        while (j < temperaturesSize && temperatures[j] <= temperatures[i]) {
            if (result[j] <= 0)
                break;
            j += result[j];
        }
        
        // If a day with higher temperature found, update result for that index
        if (j < temperaturesSize && temperatures[j] > temperatures[i]) {
            result[i] = j - i;
        }
    }
    
    return result;
}
