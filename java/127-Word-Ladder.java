//  Readable Code

class Pair{
    
    String first;
    int second;
    
    Pair(String first, int second){
        this.first = first;
        this.second = second;
    }
}

class Solution {
    
    
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        
        HashSet<String> hset = new HashSet<>();
//         Copy all String ele into the HashSet of type String
        for(int i = 0 ; i<wordList.size() ; i++){
            hset.add(wordList.get(i));
        }
//         In the Q, we will be only storing or offering the ele from the set of size n
        Queue<Pair> q = new LinkedList<>();
        
        q.add(new Pair(beginWord,1));
        
        hset.remove(beginWord); // removing the ele from the set as it is considered
        
        while(!q.isEmpty()){
            
            String word = q.peek().first;
            int steps = q.peek().second;
            
            q.poll();
//             After poll of word from q, check wheather it matches endWord or not, if matches return thr no of steps
            
            if(word.equals(endWord)) return steps;
            
//        t.C     Word length * 26 * no of words in the set (n)
//             s.c: O(n or no of words in the set ) 
            
            for(int i = 0 ; i<word.length() ; i++){
                for(char c = 'a' ; c <= 'z'; c++){
//                     Convert the word string into the chararray so as to easily manipulate  & convert back into the string and check whether any same word occurs in the string or not. if it does remove the  word from the hset and add the new manipulated string into the q
                    char[] replacedCharArray = word.toCharArray();
                    replacedCharArray[i] = c;
                    
                    String replacedWord = new String(replacedCharArray);
                    
                    if(hset.contains(replacedWord)){
                        hset.remove(replacedWord);
                        q.add(new Pair(replacedWord,steps+1));
                    }
                }
            }
        }
//         If no same sequence occured until now , return 0;
        return 0;
        
    }
}
