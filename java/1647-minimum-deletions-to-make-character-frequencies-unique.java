class Solution {
    public int minDeletions(String s) {
        int[] chars = new int[26];
        for (char c : s.toCharArray()) {
            chars[c - 'a']++;
        }

        int[] arr = Arrays.stream(chars).boxed()
                    .sorted(Collections.reverseOrder())
                    .mapToInt(Integer::intValue)
                    .toArray();
        int frequency = arr[0];
        int res = 0;
        for (int i : arr) {
            if (i > frequency) {
                if (frequency > 0)
                    res += (i - frequency);
                else
                    res += i;
            }
            frequency = Math.min(frequency - 1, i - 1);
        }
        return res;
    }
}