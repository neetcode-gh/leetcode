public class Solution
{
    /* Slow and fast pointer solution */
    /* T -> O(n) */
    /* S -> O(1) */
    public int SlowFastPointers(int[] nums)
    {
        int slowPointer = 0;
        int fastPointer = 0;
        
        do
        {
            slowPointer = nums[slowPointer];
            fastPointer = nums[fastPointer];
            fastPointer = nums[fastPointer];
        } while(slowPointer != fastPointer);
        
        slowPointer = 0;
        
        while(slowPointer != fastPointer)
        {
            slowPointer = nums[slowPointer];
            fastPointer = nums[fastPointer];
        }
        
        return slowPointer;
    }
    
    /* Pidgeon Hole concept */
    /* T -> O(n) */
    /* S -> O(1) */
    public int PidgeonHole(int[] nums)
    {
        int absVal = 0;
        int numberThatWasNegative = -1;
        
        for(int i = 0; i < nums.Length; i++)
        {
            absVal = Math.Abs(nums[i]);
            
            if(nums[absVal] > 0)
            {
                nums[absVal] *= -1;
            }
            else
            {
                numberThatWasNegative = absVal;
                break;
            }
        }
        
        return numberThatWasNegative;
    }
}
