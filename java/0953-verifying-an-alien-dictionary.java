class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        Map<Character, Integer> orderInd = new HashMap<>(); {
            int ind = 0;
            for(char c: order.toCharArray())
                orderInd.put(c, ind++);
        }
        
        for(int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            
            for(int j = 0; j < w1.length(); j++)
                if(j == w2.length())
                    return false;
                else if(w1.charAt(j) != w2.charAt(j))
                    if(orderInd.get(w2.charAt(j)) < orderInd.get(w1.charAt(j)))
                        return false;
                    else
                        break;
        }
        
        return true;
    }
}
