class Solution {
    public boolean isIsomorphic(String s, String t) {
        // Needs bidirectional mapping from s <--> t
        if(s.length() != t.length()) {
            return false;
        }

        Map<Character, Character> mapSourceToDest = new HashMap<>();
        Map<Character, Character> mapDestToSource = new HashMap<>();

        int len = s.length();
        for(int i=0; i<len; i++) {
            char sourceChar = s.charAt(i), destChar = t.charAt(i);
            char sourceReturn = mapSourceToDest.getOrDefault(sourceChar, destChar);
            if(sourceReturn != destChar) {
                return false;
            }
            mapSourceToDest.put(sourceChar, destChar);

            char destReturn = mapDestToSource.getOrDefault(destChar, sourceChar);
            if(destReturn != sourceChar) {
                return false;
            }
            mapDestToSource.put(destChar, sourceChar);
        }

        return true;
    }
}