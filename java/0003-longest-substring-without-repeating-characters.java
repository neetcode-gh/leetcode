class Solution {

    public int lengthOfLongestSubstring(String s) {
            List<Character> substringL = new ArrayList<>();
            int largestlength = 0;
            for(int right = 0; right < s.length(); right++) {
                if(substringL.contains(s.charAt(right))) { 
                    int index = substringL.indexOf(s.charAt(right)); // get the index of the element
                    substringL.remove(index); 
                    if(index > 0) substringL.subList(0, index).clear(); // in case the repeated element appears in the middle of substring we remove all the elements come bofore it
                }
                substringL.add(s.charAt(right));
                largestlength = Math.max(largestlength, substringL.size());
            }
            return largestlength;
    }
}
