public class Solution {
    public bool IsHappy(int n) {
        
        var set = new HashSet<int>();

        while (!set.Contains(n))
        {
            set.Add(n);
            n = SumOfSquare(n);
            if (n == 1) return true;
        }
        
        return false;
    }
    
    int SumOfSquare (int x)
    {
        int sum = 0;
        
        for (int i = x; i > 0; i /= 10){
            int y = i % 10;
            sum += y * y;
        }
        
        return sum;
    }
}