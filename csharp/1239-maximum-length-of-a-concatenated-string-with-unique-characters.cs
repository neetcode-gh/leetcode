public class Solution 
{
    public int MaxLength(IList<string> arr)
    {
        List<int> masks = GetMasks(arr);
        int max_len = 0;
        Backtrack(ref max_len, 0, masks, 0);
        return max_len;
    }

    private void Backtrack(ref int max_len, int current_mask, List<int> masks, int index) 
    {
        for (int i = index; i < masks.Count; i++)
        {
            if ((current_mask & masks[i]) == 0)
            {
                int xor = current_mask ^ masks[i];
                max_len = Math.Max(max_len, int.PopCount(xor));
                Backtrack(ref max_len, xor, masks, i + 1);
            }
            else 
            { 
                Backtrack(ref max_len, current_mask, masks, i + 1);
            }
        }
    }

    private List<int> GetMasks(IList<string> arr) 
    {
        List<int> masks = new List<int>();
        for (int i = 0; i < arr.Count; i++)
        {
            int mask = 0; bool is_unique = true;
            for (int j = 0; j < arr[i].Length; j++)
            {
                int temp = mask ^ (1 << arr[i][j] - 'a');
                if (temp < mask)
                {
                    is_unique = false;
                    break;
                }
                mask = temp;
            }
            if (is_unique) masks.Add(mask);
        }
        return masks;
    }
}