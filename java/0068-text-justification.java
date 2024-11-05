class Solution {
    int MAX_WIDTH;

    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> result = new ArrayList<>();
        int n = words.length;
        MAX_WIDTH = maxWidth;
        int i = 0;
        
        while(i<n) {
            int lettersCount = words[i].length();
            int j = i+1;
            int spaceSlots = 0;
            
            while(j < n && spaceSlots + lettersCount + words[j].length() + 1 <= maxWidth) {
                lettersCount += words[j].length();
                spaceSlots++;
                j++;
            }
            
            int remainingSlots = maxWidth-lettersCount;
            
            
            int eachWordSpace = spaceSlots == 0 ? 0 : remainingSlots / spaceSlots;
            int extraSpace = spaceSlots == 0 ? 0 : remainingSlots % spaceSlots;
            
            if(j == n) { //means we are on last line (left justfied)
                eachWordSpace = 1;
                extraSpace = 0;
            }
            
            
            result.add(getFinalWord(i, j, eachWordSpace, extraSpace, words));
            i=j;
        }
        
        return result;
    }

    private String getFinalWord(int i, int j, int eachWordSpace, int extraSpace, String[] words) {
        StringBuilder sb = new StringBuilder();

        for(int k = i; k < j; k++) {
            sb.append(words[k]);

            if(k == j-1) continue;

            for(int space = 1; space <= eachWordSpace; space++){
                sb.append(" ");
            }

            if(extraSpace > 0) {
                sb.append(" ");
                extraSpace--;
            }
        }

        while(sb.length() < MAX_WIDTH) {
            sb.append(" ");
        }
        
        return sb.toString();
    }
}