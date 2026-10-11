class Solution {
    public int maxTurbulenceSize(int[] arr) {
        int res = 1, total = 1;
        Boolean isHigher = null;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                if (isHigher != null && !isHigher) {
                    total += 1;
                } else {
                    total = 2;
                }
                isHigher = true;
            } else if (arr[i] < arr[i - 1]) {
                if (isHigher != null && isHigher) {
                    total += 1;
                } else {
                    total = 2;
                }
                isHigher = false;
            } else {
                total = 1;
                isHigher = null;
            }

            res = Math.max(res, total);
        }

        return res;
    }
}