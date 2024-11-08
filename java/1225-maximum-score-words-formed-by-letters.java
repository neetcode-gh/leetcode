class Solution {

    Map<Character, Integer> freq;
    int[] scoree;

    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        scoree = score;
        freq = new HashMap<>();
        for(char c: letters){
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        return backtrack(words, 0);
    }
    private int backtrack(String[] words, int idx){
        if(idx == words.length)
            return 0;

        int res = backtrack(words, idx + 1);
        if(can_form_word(words[idx])){
            for(char c: words[idx].toCharArray())
                freq.put(c, freq.get(c) - 1);

            res = Math.max(res, get_score(words[idx]) + backtrack(words, idx + 1));
            for(char c: words[idx].toCharArray())
                freq.put(c, freq.get(c) + 1);    
        } 
        return res;   
    }
    private boolean can_form_word(String s){
        Map<Character, Integer> map = new HashMap<>();
        for(char c: s.toCharArray())
            map.put(c, map.getOrDefault(c, 0) + 1);

        for(char c: map.keySet()){
            if(!freq.containsKey(c) || map.get(c) > freq.get(c))
                return false;
        }
        return true;    
    }
    private int get_score(String s){
        int score = 0;
        for(char c: s.toCharArray()){
            score += scoree[c - 'a'];
        }
        return score;
    }
}
