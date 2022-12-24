public class Solution
{
    public string AlienOrder(string[] words)
    {

        var adj = new Dictionary<char, HashSet<char>>();

        //Add all the available characters to the adjacency list resolves all the edges 
        foreach (var word in words)
        {
            foreach (var c in word)
            {
                if (adj.ContainsKey(c)) continue;
                adj[c] = new HashSet<char>();
                //alphabet.Add(c);
            }
        }

        for (var i = 0; i < words.Length - 1; i++)
        {
            var w1 = words[i];
            var w2 = words[i + 1];

            var minLen = Math.Min(w1.Length, w2.Length);
            if (w1.Length > w2.Length && w1.Substring(0, minLen) == w2.Substring(0, minLen))
            {
                return "";
            }

            for (var j = 0; j < minLen; j++)
            {
                if (w1[j] != w2[j])
                {
                    //adj.TryAdd(w1[j], new HashSet<char>());
                    adj[w1[j]].Add(w2[j]);
                    break;
                }
            }

        }

        var visited = new Dictionary<char, bool>(); //false = visited, true = in the current path
        var res = new List<char>();

        bool dfs(char c)
        {
            if (visited.ContainsKey(c))
                return visited[c]; //true: there is a cycle - we are visiting this twice


            visited.TryAdd(c, false);
            visited[c] = true;

            foreach (var neigh in adj[c])
            {

                if (dfs(neigh))
                    return true;
            }


            visited[c] = false;
            res.Add(c);

            return visited[c];
        }

        foreach (var c in adj.Keys)
        {
            if (dfs(c))
                return "";
        }

        res.Reverse();
        return string.Join("", res);

    }
}