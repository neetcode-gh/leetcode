class Solution {
    
    public boolean checkInclusion(String s1, String s2) {

        int n = s1.length();
        int m = s2.length();

        if(n > m)
            return false;

        int[] f1 = new int[26];
        int[] f2 = new int[26];

        for(int i=0; i<n; i++)
            f1[s1.charAt(i)-'a']++;

        for(int i=0; i<n; i++) // we will iterate only till n chars since those will form the initial permutation
            f2[s2.charAt(i)-'a']++;

        if (Arrays.equals(f1, f2))
            return true;
        
        int idx = n; // start of next window

        while(idx < m){

            // we have moved the window one step towards right
            // so freq of char at idx should increase
            // and freq of left most char in prev window should decrease
            char newChar = s2.charAt(idx);
            char prevChar = s2.charAt(idx-n);

            f2[newChar-'a']++;
            f2[prevChar-'a']--;

            if (Arrays.equals(f1, f2))
                return true;

            idx++;

        }
        
        return false;

    }

    public int initializeMatch(int[] f1, int[] f2){
        
        int count = 0;

        for(int i=0; i<26; i++){
            if(f1[i] == f2[i])
                count++;
        }

        return count;
    }

}
