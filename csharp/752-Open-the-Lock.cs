public class Solution {
    public int OpenLock(string[] deadends, string target)
        {
            const string start = "0000";

            var deadEnds = deadends.ToHashSet();
            var visited = new HashSet<string>();
            if (deadEnds.Contains(start) || deadends.Contains(target)) return -1;

            Queue<string> q = new Queue<string>(new[] { start });
            visited.Add(start);
            int res = 0;
            while (q.Count > 0)
            { 
                int queueCnt=q.Count;
                for (int i = 0; i < queueCnt; i++)
                {
                    var curr = q.Dequeue();
                    if (curr == target) return res;
                    foreach (var nei in GetNeighbors(curr))
                    {
                        if (!visited.Contains(nei) && !deadends.Contains(nei))
                        {
                            q.Enqueue(nei);
                            visited.Add(nei);
                        }
                    }
                }
                res++;
            }
            return -1;
        }

        private List<string> GetNeighbors(string s)
        {
            var result = new List<string>();
            for (int i = 0; i < s.Length; i++)
            {
                var charAr1 = s.ToCharArray();
                charAr1[i] = charAr1[i] == '9' ? '0' : (char)((int)charAr1[i] + 1);
                result.Add(new string(charAr1));
                var charAr2 = s.ToCharArray();
                charAr2[i] = charAr2[i] == '0' ? '9' : (char)((int)charAr2[i] - 1);
                result.Add(new string(charAr2));
            }
            return result;
        }
}
