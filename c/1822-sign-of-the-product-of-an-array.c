int arraySign(int *nums, int numsSize) {
  char prodSign = 1;
  for (int i = 0; i < numsSize; i++)
    prodSign *= ((unsigned)-nums[i] >> 31) - ((unsigned)nums[i] >> 31);
  return prodSign;
}
