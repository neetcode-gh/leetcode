public class Solution {
    public int MaxProduct(string s) {
        if(s == null || s.Length < 2)
            return 0;
        if(s.Length == 2)
            return 1;

        int n = s.Length;
        int total = 1 << n;

        List<(int, int)> possible = new List<(int, int)>();

        for(int i = 0; i < total; i++) {
            StringBuilder sb = new StringBuilder();

            for(int j = 0; j < n; j++) {
                if((i & (1 << j)) != 0) {
                    sb.Append(s[j]);
                }
            }

            if(IsPalindrome(sb.ToString())) {
                possible.Add((i, sb.Length));
            }
        }

        int ans = 0;
        for(int i = 0; i < possible.Count; i++) {
            int bitmask = possible[i].Item1;
            int count = possible[i].Item2;
            for(int j = i + 1; j < possible.Count; j++) {
                int bitmask2 = possible[j].Item1;
                int count2 = possible[j].Item2;
                if((bitmask & bitmask2) == 0)
                    ans = Math.Max(ans, count * count2);
            }
        }
        return ans;
    }

    private bool IsPalindrome(string s){
        int i = 0;
        int j = s.Length - 1;
        while(i < j) {
            if(s[i++] != s[j--])
                return false;
        }
        return true;
    }
}