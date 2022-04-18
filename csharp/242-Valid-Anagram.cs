public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length)
            return false;
        
        Dictionary<char, int> counter = new Dictionary<char, int>();
        
        for (int i = 0; i < s.Length; i++) {
            SetOrAdd(counter, s[i], 1);
            SetOrAdd(counter, t[i], -1);
        }
        
        foreach(var num in counter.Values)
            if (num != 0)
                return false;
        
        return true;
    }
    
    public void SetOrAdd(Dictionary<char, int> collection, char key, int addition) 
    {
        if (!collection.ContainsKey(key))
            collection[key] = addition;
        else
            collection[key] += addition;
    }
    
}