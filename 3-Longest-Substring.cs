using System;
namespace AlgoPractice
{
	public class Solution
	{
		public int LengthOfLongestSubstring(string s)
		{
			var set = new HashSet<char>();
			var maxLength = 0;
			var left = 0;
			var right = 0;
			while(right < s.Length)
            {
				var currentChar = s[right];
				while (set.Contains(currentChar) && left < s.Length)
				{
					set.Remove(s[left++]);
				}
				set.Add(currentChar);
				right++;
				var length = right - left;
				maxLength = Math.Max(length, maxLength);
			}
			return maxLength;
		}
	}
}

