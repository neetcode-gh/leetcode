class Solution {
    
    private Node root;
    
    class Node {
        HashMap<Character, Node> children = new HashMap<>();
        boolean isWord = false;
    }
    
    public Solution() {
        this.root = new Node();
    }
    
    public void insert(Node r, String word) {
        Node curr = r;
        for(char c : word.toCharArray()) {
            if(!curr.children.containsKey(c)) {
                curr.children.put(c, new Node());
            }
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
    
    public List<String> findWords(char[][] board, String[] words) {
        Node cur = this.root;
        for(String w : words) {
            insert(cur, w);
        }
        
        int rows = board.length;
        int cols = board[0].length;
        HashSet<String> res = new HashSet<>();
        for(int i = 0;i < rows;i++) {
            for(int j = 0;j < cols;j++) {
                check(board, this.root, i, j, rows, cols, res, "");
            }
        }
        List<String> ans = new ArrayList<>();
        ans.addAll(res);
        return ans;
    }
    
    public void check(char[][] board, Node temp, int i, int j, int m, int n, HashSet<String> res, String w) {
        if (i < 0 || j < 0 || i >= m || j >= n || !temp.children.containsKey(board[i][j]))return;
        if (temp.children.containsKey(board[i][j])) {
            w+=board[i][j];
            temp = temp.children.get(board[i][j]);
            if(temp.isWord) {
                res.add(w);
            }
            board[i][j] += 100;
            check(board, temp, i + 1, j, m, n, res, w);
            check(board, temp, i, j + 1, m, n, res, w);
            check(board, temp, i - 1, j, m, n, res, w);
            check(board, temp, i, j - 1, m, n, res, w);
            board[i][j] -= 100;
        }
    } 
}