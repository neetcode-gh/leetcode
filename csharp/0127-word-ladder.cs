public class Solution
{
    //T: O(N^2*M) where N is the length of the word, M is total no. of words
    //S: O(N^2*M) where N is the length of the word, M is total no. of words
    public int LadderLength(string beginWord, string endWord, IList<string> wordList)
    {
        if (!wordList.Contains(endWord))
        {
            return 0;
        }

        var nei = new Dictionary<string,
          HashSet<string>>();
        if (!wordList.Contains(beginWord))
            wordList.Add(beginWord);

        foreach (var word in wordList)
        {
            for (var j = 0; j < word.Length; j++)
            {
                var pattern = word.Substring(0, j) + "*" + word.Substring(j + 1);
                nei.TryAdd(pattern, new HashSet<string>());
                nei[pattern].Add(word);
            }
        }

        foreach (var neiWord in nei.Keys)
        {
            foreach (var val in nei[neiWord])
            {
                Console.WriteLine("neiWord : " + neiWord + " val : " + val);
            }
        }

        var visited = new HashSet<string>();
        visited.Add(beginWord);

        var queue = new Queue<string>();
        queue.Enqueue(beginWord);

        var result = 1;

        while (queue.Count > 0)
        {
            var count = queue.Count;
            for (var i = 0; i < count; i++)
            {
                var item = queue.Dequeue();
                if (string.Equals(item, endWord))
                    return result;

                for (var j = 0; j < item.Length; j++)
                {
                    var pattern = item.Substring(0, j) + "*" + item.Substring(j + 1);
                    foreach (var neiWord in nei[pattern])
                    {
                        if (!visited.Contains(neiWord))
                        {
                            queue.Enqueue(neiWord);
                            visited.Add(neiWord);

                        }
                    }

                }

            }
            result += 1;
        }

        return 0;
    }
}