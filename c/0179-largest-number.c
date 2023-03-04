int cmp(const void *a, const void *b)
{
    int ele1 = *(int *)a, ele2 = *(int *)b, d1 = 0, d2 = 0;

    if (!ele1 && !ele2)
        return 0; // deal with zero, return 0 means don't care the order

    while (ele1)
    {
        ele1 /= 10;
        d1++;
    }

    while (ele2)
    {
        ele2 /= 10;
        d2++;
    }

    char *e1 = calloc(d1 + 1, sizeof(char)), *e2 = calloc(d2 + 1, sizeof(char));
    snprintf(e1, d1 + 1, "%d", *(int *)a);
    snprintf(e2, d2 + 1, "%d", *(int *)b);

    char *p1 = e1, *p2 = e2;
    while (*p1 == *p2 && (*(p1 + 1) != '\0' || *(p2 + 1) != '\0'))
    {
        if (*(p1 + 1) == '\0')
        {
            p1 = e1;
        }
        else
            p1 = p1 + 1; // next element

        if (*(p2 + 1) == '\0')
        {
            p2 = e2;
        }
        else
        {
            p2 = p2 + 1;
        }
    }
    return *p2 - *p1; // return positive means the first argument is behind the second argument, otherwise the second argument is behind the first argument
}

char *largestNumber(int *nums, int numsSize)
{
    qsort(nums, numsSize, sizeof(int), cmp);

    bool allZero = true; // check if all elements are zero
    int dig = 0;         // count the digits of number

    for (int i = 0; i < numsSize; i++)
    {
        if (nums[i] != 0)
            allZero = false;
        int e = nums[i];
        if (e == 0)
            dig++; // deal with 0 element
        while (e)
        {
            e /= 10;
            dig++;
        }
    }

    if (allZero)
        return "0";

    char *ans = (char *)calloc(dig + 1, sizeof(char));

    for (int i = 0; i < numsSize; i++)
    {
        snprintf(ans + strlen(ans), dig + 1 - strlen(ans), "%d", nums[i]);
    }

    return ans;
}