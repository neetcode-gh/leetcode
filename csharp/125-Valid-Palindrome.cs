public class Solution {
    public bool IsPalindrome(string s) {
        int left = 0, right = s.Length - 1;
        
        s = s.ToLower();
        while (left < right)
        {
            
            while (left < right && !char.IsLetterOrDigit(s[left])) 
                left += 1;
            
            while (left < right && !char.IsLetterOrDigit(s[right]))
                right -= 1;
            
            // If this results in true, we don't have a palindrome.
            if (!s[left].Equals(s[right]))
                return false;
            
            left += 1;
            right -= 1;
        }
        
        return true;
    }
       
}