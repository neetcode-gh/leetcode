using System;
namespace AlgoPractice
{
	public class Solution
	{
		public bool IsValid(string s)
		{
			var map = new Dictionary<char, char>
			{
				[')'] = '(',
				['}'] = '{',
				[']'] = '['
			};

			var stack = new Stack<char>();
			foreach(char c in s)
            {
                if (map.ContainsKey(c))
                {
					var matchingPar = stack.Count == 0 ? '#' : stack.Pop();
					if(map[c] != matchingPar)
                    {
						return false;
                    }
                }
                else
                {
					stack.Push(c);
                }
            }
			return stack.Count == 0;
		}
	}
}

