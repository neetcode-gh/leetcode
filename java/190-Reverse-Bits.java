public class Solution {

  // you need treat n as an unsigned value
  public int reverseBits(int n) {
    int res = 0;
    int mask = 1;

    for (int i = 0; i < 32; i++) {
      int tmp = n & mask;
      if (tmp != 0) {
        int tmpMask = 1 << (31 - i);
        res = res | tmpMask;
      }
      mask <<= 1;
    }
    return res;
  }
}
