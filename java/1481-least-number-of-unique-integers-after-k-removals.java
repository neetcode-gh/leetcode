class Solution {
    public int findLeastNumOfUniqueInts(int[] arr, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : arr) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        int[] freqList = new int[arr.length + 1];
        for (int f : freq.values()) {
            freqList[f] += 1;
        }

        int res = freq.size();
        for (int f = 1; f < freqList.length; f++) {
            int remove = freqList[f];
            if (k >= f * remove) {
                k -= f * remove;
                res -= remove;
            } else {
                remove = k / f;
                res -= remove;
                break;
            }
        }
        return res;
    }
}
