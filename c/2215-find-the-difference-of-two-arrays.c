/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume
 * caller calls free().
 */

// Enumeration for more descriptive indexing into arrays
enum QuickSortPositions { LEFT_MOST, RIGHT_MOST };
enum AnswerArrayIndex { ARRAY_ONE, ARRAY_TWO };

// Prototypes
void quicksort(int *nums, int numsSize);
void _quicksort(int *array, int array_length, int left, int right);
int *partition3(int *array, int left, int right);
void swap(int *first_value, int *second_value);

int **createAnswerArray(int nums1Size, int nums2Size);
void skipRepeatedValues(int *nums, int *numsCurrentIndex, int numsSize);
int hasNotReachedTheEndOfOneOfTheArrays(int nums1CurrentIndex, int nums1Size,
                                        int nums2CurrentIndex, int nums2Size);
void processArrays(int *nums1, int nums1Size, int *nums2, int nums2Size,
                   int *answerArrayOne, int *answerArrayTwo,
                   int *answerArrayOneSize, int *answerArrayTwoSize);

int **findDifference(int *nums1, int nums1Size, int *nums2, int nums2Size,
                     int *returnSize, int **returnColumnSizes) {
  // Preparing return values
  *returnSize = 2;
  *returnColumnSizes = (int *)calloc(*returnSize, sizeof(int));
  int *answerArrayOneSize = &(*returnColumnSizes)[ARRAY_ONE];
  int *answerArrayTwoSize = &(*returnColumnSizes)[ARRAY_TWO];

  int **answer = createAnswerArray(nums1Size, nums2Size);
  int *answerArrayOne = answer[ARRAY_ONE];
  int *answerArrayTwo = answer[ARRAY_TWO];

  // This approach needs sorted arrays
  quicksort(nums1, nums1Size);
  quicksort(nums2, nums2Size);

  // Populate the answer arrays
  processArrays(nums1, nums1Size, nums2, nums2Size, answerArrayOne,
                answerArrayTwo, answerArrayOneSize, answerArrayTwoSize);

  return answer;
}

void processArrays(int *nums1, int nums1Size, int *nums2, int nums2Size,
                   int *answerArrayOne, int *answerArrayTwo,
                   int *answerArrayOneSize, int *answerArrayTwoSize) {
  int nums1CurrentIndex = 0;
  int nums2CurrentIndex = 0;

  while (hasNotReachedTheEndOfOneOfTheArrays(nums1CurrentIndex, nums1Size,
                                             nums2CurrentIndex, nums2Size)) {
    skipRepeatedValues(nums1, &nums1CurrentIndex, nums1Size);
    skipRepeatedValues(nums2, &nums2CurrentIndex, nums2Size);

    if (nums1[nums1CurrentIndex] == nums2[nums2CurrentIndex]) {
      nums1CurrentIndex++;
      nums2CurrentIndex++;
    } else if (nums1[nums1CurrentIndex] < nums2[nums2CurrentIndex])
      answerArrayOne[(*answerArrayOneSize)++] = nums1[nums1CurrentIndex++];
    else
      answerArrayTwo[(*answerArrayTwoSize)++] = nums2[nums2CurrentIndex++];
  }

  // Populate remaining unique elements
  while (nums1CurrentIndex < nums1Size) {
    skipRepeatedValues(nums1, &nums1CurrentIndex, nums1Size);
    answerArrayOne[(*answerArrayOneSize)++] = nums1[nums1CurrentIndex++];
  }
  while (nums2CurrentIndex < nums2Size) {
    skipRepeatedValues(nums2, &nums2CurrentIndex, nums2Size);
    answerArrayTwo[(*answerArrayTwoSize)++] = nums2[nums2CurrentIndex++];
  }
}

// Helper Functions
void skipRepeatedValues(int *nums, int *numsCurrentIndex, int numsSize) {
  while (*numsCurrentIndex < numsSize - 1 &&
         nums[*numsCurrentIndex] == nums[*numsCurrentIndex + 1]) {
    (*numsCurrentIndex)++;
  }
}

int hasNotReachedTheEndOfOneOfTheArrays(int nums1CurrentIndex, int nums1Size,
                                        int nums2CurrentIndex, int nums2Size) {
  return nums1CurrentIndex < nums1Size && nums2CurrentIndex < nums2Size;
}

int **createAnswerArray(int nums1Size, int nums2Size) {
  int **answer = (int **)malloc(2 * sizeof(int *));
  answer[ARRAY_ONE] = (int *)malloc(nums1Size * sizeof(int));
  answer[ARRAY_TWO] = (int *)malloc(nums2Size * sizeof(int));
  return answer;
}

// QuickSort Implementation
void quicksort(int *nums, int numsSize) {
  _quicksort(nums, numsSize, 0, numsSize - 1);
}

void _quicksort(int *array, int array_length, int left, int right) {
  while (left < right) {
    int *middle = partition3(array, left, right);
    if (middle[LEFT_MOST] - left < right - middle[RIGHT_MOST]) {
      _quicksort(array, array_length, left, middle[LEFT_MOST] - 1);
      left = middle[RIGHT_MOST] + 1;
    } else {
      _quicksort(array, array_length, middle[RIGHT_MOST] + 1, right);
      right = middle[LEFT_MOST] - 1;
    }
    free(middle);
  }
}

int *partition3(int *array, int left, int right) {
  int pivot_position = left + (right - left) / 2;
  int pivot = array[pivot_position];
  swap(&array[left], &array[pivot_position]);

  int *middle = (int *)malloc(2 * sizeof(int));

  middle[LEFT_MOST] = left;
  middle[RIGHT_MOST] = left;

  for (int i = left + 1; i <= right; ++i) {
    if (array[i] == pivot) {
      middle[RIGHT_MOST]++;
      swap(&array[middle[RIGHT_MOST]], &array[i]);
    }
    if (array[i] < pivot) {
      middle[LEFT_MOST]++;
      middle[RIGHT_MOST]++;
      swap(&array[middle[RIGHT_MOST]], &array[i]);
      swap(&array[middle[LEFT_MOST]], &array[middle[RIGHT_MOST]]);
    }
  }
  swap(&array[left], &array[middle[LEFT_MOST]]);
  return middle;
}

void swap(int *first_value, int *second_value) {
  int tmp_value = *first_value;
  *first_value = *second_value;
  *second_value = tmp_value;
}

// Simpler answer with Sets:

int **findDifference(int *nums1, int nums1Size, int *nums2, int nums2Size,
                     int *returnSize, int **returnColumnSizes) {
  int **answer = (int **)malloc(2 * sizeof(int *));
  answer[0] = (int *)malloc(nums1Size * sizeof(int));
  answer[1] = (int *)malloc(nums2Size * sizeof(int));

  *returnSize = 2;
  *returnColumnSizes = (int *)calloc(*returnSize, sizeof(int));
  int *answerArrayOneSize = &(*returnColumnSizes)[0];
  int *answerArrayTwoSize = &(*returnColumnSizes)[1];

  int *table = (int *)calloc(2001, sizeof(int));

  for (int i = 0; i < nums1Size; i++) {
    table[nums1[i] + 1000] = 1;
  }
  for (int i = 0; i < nums2Size; i++) {
    if (table[nums2[i] + 1000] == 0)
      answer[1][(*answerArrayTwoSize)++] = nums2[i];
    table[nums2[i] + 1000] = -1;
  }

  for (int i = 0; i < 2001; i++) {
    if (table[i] == 1) answer[0][(*answerArrayOneSize)++] = i - 1000;
  }
  return answer;
}
