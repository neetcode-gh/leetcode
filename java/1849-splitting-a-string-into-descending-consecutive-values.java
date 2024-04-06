import java.math.BigInteger;

class Solution {
    public boolean splitString(String s) {
        for (int i = 0; i < s.length() - 1; i++) {
            BigInteger curValue = new BigInteger(s.substring(0, i + 1));
            if (backtrack(i + 1, s, curValue)) {
                return true;
            }
        }

        return false;
    }

    private boolean backtrack(int startIndex,
                              String s,
                              BigInteger lastValue) {
        if (startIndex >= s.length()) {
            return true;
        }

        for (int i = startIndex; i < s.length(); i++) {
            BigInteger curValue = new BigInteger(s.substring(startIndex, i + 1));
            if (lastValue.subtract(curValue).compareTo(BigInteger.ONE) == 0 &&
                    backtrack(i + 1, s, curValue)) {
                return true;
            }
        }

        return false;
    }
}
