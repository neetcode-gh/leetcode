class WordDictionary {

    Node root;
    
    public class Node{
        char value;
        boolean isWord;
        Node[] children;
        
        public Node(char value) {
            this.value = value;
            isWord = false;
            children = new Node[26];
        }
    }
    public WordDictionary() {
        root = new Node('\0');
    }
    
    public void addWord(String word) {
        Node curr = root;
        
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            
            if (curr.children[ch - 'a'] == null)
                curr.children[ch - 'a'] = new Node(ch);
            
            curr = curr.children[ch - 'a'];
            
        }
          curr.isWord = true;
    }
    
    
    // TC O(m^2)
    public boolean search(String word) {
        Node curr = root;       // assigns the node that called the search function
        return searchHelper(word, root);
        
    }
    
     public boolean searchHelper(String word, Node curr) {
         
     for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            
            if(ch == '.') {
                for(Node temp: curr.children) {
                    if(temp != null && searchHelper(word.substring(i+1), temp)) 
                        return true;
                }
                return false;
            }
            
            if (curr.children[ch - 'a'] == null)
                return false;
            
            curr = curr.children[ch - 'a'];
        }
        
        if (curr.isWord == true)
            return true;
        else
            return false;
     }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary();
 * obj.addWord(word);
 * boolean param_2 = obj.search(word);
 */