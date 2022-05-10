using System;
namespace AlgoPractice
{
	public class Solution
    {

        // Encodes a list of strings to a single string.
        public string Encode(IList<string> strs)
        {
            var result = string.Empty;
            foreach(var str in strs)
            {
                result += $"{str.Length}#{str}";
            }
            return result;
        }

        // Decodes a single string to a list of strings.
        public IList<string> Decode(string s)
        {
            IList<string> result = new List<string>();
            var i = 0;
            while(i < s.Length)
            {
                var j = i;
                while(s[j] != '#')
                {
                    j++;
                }

                var numStr = s.Substring(i, j - i);
                var num = int.Parse(numStr);

                var word = s.Substring(j+1, num);
                result.Add(word);

                i = j + 1 + num;
            }
            return result;
        }

    }
}

