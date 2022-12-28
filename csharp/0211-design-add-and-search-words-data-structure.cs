public class TrieNode
{
    public Dictionary<char, TrieNode> Children;
    public bool EndOfWord;

    public TrieNode()
    {
        Children = new Dictionary<char, TrieNode>();
        EndOfWord = false;
    }
}

public class WordDictionary
{

    public TrieNode root;

    public WordDictionary()
    {
        root = new TrieNode();
    }

    public void AddWord(string word)
    {
        var current = root;
        for (var i = 0; i < word.Length; i++)
        {
            if (!current.Children.ContainsKey(word[i]))
            {
                var newNode = new TrieNode();
                current.Children.Add(word[i], newNode);
            }
            current = current.Children[word[i]];
        }
        current.EndOfWord = true;
    }

    public bool Search(string word)
    {
        return dfs(0, root, word);
    }

    private bool dfs(int index, TrieNode root, string word)
    {
        var currentNode = root;

        for (var i = index; i < word.Length; i++)
        {
            var letter = word[i];
            if (letter == '.')
            {
                foreach (var (key, value) in currentNode.Children)
                {
                    if (dfs(i + 1, value, word))
                    {
                        return true;
                    }
                }

                return false;
            }
            else
            {
                if (!currentNode.Children.ContainsKey(letter))
                {
                    return false;
                }
                currentNode = currentNode.Children[letter];
            }
        }
        return currentNode.EndOfWord;
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary();
 * obj.AddWord(word);
 * bool param_2 = obj.Search(word);
 */