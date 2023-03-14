// Compare two numbers in a concatenated form.
// eg: 12 and 34 will be compared as 1234 vs 3412
int compareInt(const void *a, const void *b) {
    int i = 10;
    int j = 10;
    int x = *(int*)a;
    int y = *(int*)b;

    while (x /= 10) i *= 10;
    while (y /= 10) j *= 10;

    return  (((unsigned int)*(int*)b * i) + *(int*)a) > (((unsigned int)*(int*)a * j) + *(int*)b);
}

char * largestNumber(int* nums, int numsSize){
    char *res = NULL;
    int i, len, pos;

    if (numsSize < 0) {
        return res;
    }

    // Sort the array with specified comparaotor.
    qsort(nums, numsSize, sizeof(int), compareInt);

    // Caculate the length of the return string.
    len = 1;
    for (i = 0; i < numsSize; i++) len +=  snprintf(NULL, 0, "%d", nums[i]);
    res = calloc(len, sizeof(char));

    // If the firs element of sorted array is 0,
    // return a single digit of 0 no matter how long is the string.
    if (nums[0] == 0) {
        res[0] = '0';
        return res;
    }

    // Print all nums to the return string.
    pos = 0;
    for (i = 0; i < numsSize; i++) {
        pos += snprintf(res + pos, len, "%d", nums[i]);
    }

    return res;
}
