class Solution {
    public boolean isAnagram(String s, String t) {
        
        // If the lengths of the inputs are not equal,
        // they cannot form an anagram
        if(s.length() != t.length()) return false;
        
        // If both the strings are same, then they
        // form an anagram
        if(s.equals(t)) return true;
        
        // Create 2 new HashMaps to store the characters in
        // each string as key and their respective number of 
        // occurences as values
        Map<Character, Integer> sMap = new HashMap<>();
        Map<Character, Integer> tMap = new HashMap<>();
        
        // Use the merge() function of HashMap to increment
        // the value for every occurence of a key in the string
        for(int i = 0; i < s.length(); i++) {
            sMap.merge(s.charAt(i), 1, Integer::sum);
            tMap.merge(t.charAt(i), 1, Integer::sum);
        }
        
        // If the number of occurences of at least one character
        // in a string doesn't match with the same in the other
        // string, then both strings together cannot form an anagram
        for(Character c : sMap.keySet()) {
            if(!sMap.get(c).equals(tMap.get(c))) return false;
        }
        
        // If we haven't returned by now, it means that none of
        // the previous conditions failed. This means that we
        // should be able to create an anagram using the given two strings.
        // Hence, return true.
        return true;
    }
}
