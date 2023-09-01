int upperBound(int *arr, int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

int* longestObstacleCourseAtEachPosition(int* obstacles, int obstaclesSize, int* returnSize) {
    int* lis = (int*)malloc(obstaclesSize * sizeof(int));
    int* result = (int*)malloc(obstaclesSize * sizeof(int));
    *returnSize = obstaclesSize;

    int lisSize = 0;

    for (int i = 0; i < obstaclesSize; ++i) {
        int x = obstacles[i];
        if (lisSize == 0 || lis[lisSize - 1] <= x) {
            lis[lisSize] = x;
            result[i] = lisSize + 1;
            lisSize++;
        } else {
            int idx = upperBound(lis, lisSize, x);
            lis[idx] = x;
            result[i] = idx + 1;
        }
    }

    free(lis);
    return result;
}
