/*
Given an array of integers temperatures represents the daily temperatures, return an array answer such 
that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
If there is no future day for which this is possible, keep answer[i] == 0 instead.
Time: O(n)
Space: O(n)

*/

int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize){
    int* ans = malloc(sizeof(int)*temperaturesSize);
    *returnSize = temperaturesSize;
    int i;
    int* stack = malloc(sizeof(int)*temperaturesSize); // Contains indices
    int pos=0;
    for (i=0; i<temperaturesSize; i++) {
        while (pos>0 && temperatures[stack[pos-1]]<temperatures[i]) {
            pos--;
            ans[stack[pos]] = i-stack[pos];
        }
        stack[pos] = i;
        pos++;
    }
    for (i=0; i<pos; i++)
        ans[stack[i]] = 0;
    free(stack);
    return ans;
}
