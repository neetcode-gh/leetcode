class TrieNode{
        Map<Character,TrieNode> children;
        boolean isEndWord;
        String word;
        public TrieNode(){
            children = new HashMap<>();
            isEndWord = false;
        }
}    
class Trie{
    TrieNode root;
    Trie(){
      root = new TrieNode();  
    }
    public void addWord(String word){
        TrieNode curr = root;
        for(int i = 0; i < word.length();i++){
            char ch = word.charAt(i);
            if(curr.children.get(ch) == null){
                curr.children.put(ch,new TrieNode());
            }
            curr = curr.children.get(ch);
        }
        curr.word = word;
        curr.isEndWord = true;
    }
    public boolean searchWord(String word){
        TrieNode curr = root;
        for(int i = 0; i < word.length(); i++){
            char ch = word.charAt(i);
            if(curr.children.get(ch) == null) return false;
            curr = curr.children.get(ch);
        }
        return curr.isEndWord;
    }
}
class Solution{
  public List<String> findWords(char[][] board, String[] words) {
        Trie trie = new Trie();
        for(String word: words){
            trie.addWord(word);
        }
        Set<String> result = new HashSet<>();
        int rows = board.length,cols = board[0].length;
        boolean[][] visited = new boolean[rows][cols];
        for(int r = 0; r < rows; r++){
            for(int c = 0; c < cols; c++){
                helper(board,rows,cols,r,c,visited,trie.root,result);
            }
        }
        return new ArrayList<>(result);
    }
    
    private void helper(char[][] board,int rows,int cols,int r,int c,boolean[][] visited,TrieNode node,Set<String> result){
        if(r < 0 || r == rows || c < 0 || c == cols || visited[r][c] || node.children.get(board[r][c]) == null) return;
        visited[r][c] = true;
        node = node.children.get(board[r][c]);
        if(node.isEndWord){
            result.add(node.word);
        }
        helper(board,rows,cols,r+1,c,visited,node,result);
        helper(board,rows,cols,r-1,c,visited,node,result);   
        helper(board,rows,cols,r,c+1,visited,node,result); 
        helper(board,rows,cols,r,c-1,visited,node,result);
        visited[r][c] = false;
        return ;
    }
}
