/*-------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
-------------------------------*/

class Solution {
    public boolean closeStrings(String word1, String word2) {
        if (word1.length() != word2.length()) {
            return false;
        }

        Map<Character, Integer> freqMap1 = new HashMap<>();
        Map<Character, Integer> freqMap2 = new HashMap<>();
        for (char ch : word1.toCharArray()) {
            freqMap1.put(ch, freqMap1.getOrDefault(ch, 0) + 1);
        }
        for (char ch : word2.toCharArray()) {
            freqMap2.put(ch, freqMap2.getOrDefault(ch, 0) + 1);
        }
        if (!freqMap1.keySet().equals(freqMap2.keySet())) {
            return false;
        }

        Map<Integer, Integer> freqCount1 = new HashMap<>();
        Map<Integer, Integer> freqCount2 = new HashMap<>();
        for (int freq : freqMap1.values()) {
            freqCount1.put(freq, freqCount1.getOrDefault(freq, 0) + 1);
        }
        for (int freq : freqMap2.values()) {
            freqCount2.put(freq, freqCount2.getOrDefault(freq, 0) + 1);
        }

        return freqCount1.equals(freqCount2);
    }
}
