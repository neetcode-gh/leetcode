class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        Set<Character> allow = new HashSet<>();
        int count = 0;

        for(int i=0; i<allowed.length(); i++) {
            allow.add(allowed.charAt(i));
        }

        for(String word : words) {
            boolean flag = true;
            for(int i=0; i<word.length(); i++) {
                if(!allow.contains(word.charAt(i))) {
                    flag = false;
                    break;
                }
            }

            count = flag ? count+1 : count+0;
        }

        return count;
    }
}
