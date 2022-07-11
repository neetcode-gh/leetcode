class Solution {

  public boolean isHappy(int n) {
    if (n == 1 || n == -1) {
      return true;
    }

    Set<Integer> visit = new HashSet<Integer>();

    // compute square until getting duplicate value
    while (!visit.contains(n)) {
      visit.add(n);
      // using helper function to compute the sum of squares
      n = sumOfSquare(n);

      if (n == 1) return true;
    }

    return false;
  }

  public int sumOfSquare(int n) {
    int output = 0;

    while (n != 0) {
      int digit = n % 10;
      digit = digit * digit;
      output += digit;
      n = n / 10;
    }

    return output;
  }
}
