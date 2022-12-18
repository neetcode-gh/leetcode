public class Solution
{
    //T: O(m*n*4^Length of the word) S: O(m+n+ L)
    //S: O(m+n) is for the visited array
    public IList<string> FindWords(char[][] board, string[] words)
    {
        foreach (var word in words)
            AddWord(word);

        var rows = board.Length;
        var cols = board[0].Length;

        var result = new HashSet<string>();
        var visited = new HashSet<(int, int)>();

        void dfs(int row, int col, TrieNode node, string word)
        {

            if (row < 0 || col < 0 || row >= rows || col >= cols ||
              visited.Contains((row, col)) ||
              !node.children.ContainsKey(board[row][col]))
                return;

            visited.Add((row, col));
            node = node.children[board[row][col]];
            word += board[row][col];

            if (node.EndOfWord)
                result.Add(word);

            dfs(row - 1, col, node, word);
            dfs(row + 1, col, node, word);
            dfs(row, col - 1, node, word);
            dfs(row, col + 1, node, word);

            visited.Remove((row, col));
        }

        for (var row = 0; row < rows; row++)
        {
            for (var col = 0; col < cols; col++)
            {

                dfs(row, col, root, "");
            }
        }

        return result.ToList();
    }

    public TrieNode root;
    public Solution()
    {
        root = new TrieNode();
    }

    public void AddWord(string word)
    {
        var current = root;
        for (var i = 0; i < word.Length; i++)
        {
            if (!current.children.ContainsKey(word[i]))
            {
                var child = new TrieNode();
                current.children.Add(word[i], child);
            }
            current = current.children[word[i]];
        }
        current.EndOfWord = true;

    }

}

public class TrieNode
{
    public Dictionary<char, TrieNode> children;
    public bool EndOfWord;
    public TrieNode()
    {
        children = new Dictionary<char, TrieNode>();
        EndOfWord = false;
    }

}