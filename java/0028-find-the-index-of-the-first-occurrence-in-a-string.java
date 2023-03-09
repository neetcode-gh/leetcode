class Solution {
    public int strStr(String haystack, String needle) {
        int result = 0;
        if (haystack.length() <= 0 && needle.length() > 0) return -1;
        if (haystack.length() != 0) {
            int occurence = haystack.indexOf(needle);
            if (occurence == -1) 
                return occurence;
            result = occurence;
        }
        return result;
    }
}
