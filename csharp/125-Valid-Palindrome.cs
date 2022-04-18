public class Solution {
    public bool IsPalindrome(string s) {
        int left = 0, right = s.Length - 1;
        
        s = s.ToLower();
        while (left < right)
        {
            
            while (IsSkippableCharacter(s, left)) 
            {
                left += 1;
                if (!WithinBounds(s, left)) // Defend against OutOfBounds
                    break;
            }
            
            while (IsSkippableCharacter(s, right))
            {
                right -= 1;
                if (!WithinBounds(s, right)) // Defend against OutOfBounds.
                    break;
            }
            
            if (!(WithinBounds(s, left) && WithinBounds(s, right))) // Until now we have been good, but we've gone out of bounds. We succeeded.
                return true;
            
            // If this results in true, we don't have a palindrome.
            if (!s[left].Equals(s[right]))
                return false;
            
            left += 1;
            right -= 1;
        }
        
        return true;
    }
    
    public bool WithinBounds(string s, int index)
        => index >= 0 && index < s.Length; 
               
    public bool IsSkippableCharacter(string s, int index)
        => Char.IsSeparator(s[index]) || Char.IsSymbol(s[index]) || Char.IsPunctuation(s[index]); // Are punctuation symbols?
}