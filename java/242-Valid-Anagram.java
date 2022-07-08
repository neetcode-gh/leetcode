class Solution {
    public boolean isAnagram(String s, String t) {
    
        if(s.length()!=t.length()){
            return false;
        }

        char[] charArray = s.toCharArray();
        
        Arrays.sort(charArray);
        s = new String(charArray);
        
        charArray = t.toCharArray();        
        Arrays.sort(charArray);
        t = new String(charArray);

        if(s.equals(t)){
            return true;
        }

        return false;            
    }
}
