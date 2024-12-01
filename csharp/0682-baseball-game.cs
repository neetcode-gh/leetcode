public class Solution {
    public int CalPoints(string[] operations) {
        List<int> stack = new();

        foreach(var operation in operations)
        {
            switch(operation)
            {
                case "D":
                    stack.Add(stack[stack.Count()-1]*2);
                    break;
                case "+":
                    stack.Add(stack[stack.Count()-1] + stack[stack.Count()-2]);
                    break;
                case "C":
                    stack.RemoveAt(stack.Count()-1);
                    break;
                default:
                    stack.Add(int.Parse(operation));
                    break;
            }
        }
        
        return stack.Sum();
    }
}