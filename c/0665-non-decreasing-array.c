bool checkPossibility(int *nums, int numsSize) {
  if (numsSize == 1) return true;

  char count = 0;
  if (nums[0] > nums[1]) count++;
  for (int i = 1; i < numsSize - 1; i++)
    if (nums[i] > nums[i + 1]) {
      if (++count > 1) return false;
      if ((nums[i - 1] > nums[i + 1]) && (i < numsSize - 2) &&
          (nums[i + 2] < nums[i]))
        return false;
    }
  return true;
}
