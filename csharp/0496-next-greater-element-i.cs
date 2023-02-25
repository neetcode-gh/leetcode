public class Solution {
    public int[] NextGreaterElement(int[] nums1, int[] nums2) {
        
        Dictionary<int,int> dic = new Dictionary<int,int>();
        Stack<int> stack = new Stack<int>();
        foreach(var num in nums2)
        {
            while(stack.Count > 0 && num > stack.Peek())
                dic.Add(stack.Pop(),num);
            
            stack.Push(num);
        }
        
        int[] res = new int[nums1.Length];
        for(int i = 0; i < nums1.Length; i++)
            res[i] = dic.ContainsKey(nums1[i])? dic[nums1[i]] : -1;
        
        return res;
    }
}