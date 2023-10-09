int removeDuplicates(int* nums, int numsSize) {
  int k = 1;
  int sequence = 0;
  for (int pos = 1; pos < numsSize; pos++) {
    int repNum = nums[pos] == nums[k - 1];
    if (sequence && repNum)
      k--;
    else if (repNum)
      sequence = 1;
    else
      sequence = 0;
    nums[k] = nums[pos];
    k++;
  }
  return k;
}
