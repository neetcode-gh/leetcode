public class Solution {
    private static int evaluate(int b, int a, string op) => op switch{
        "+" => a + b,
        "-" => a - b,
        "*" => a * b,
        "/" => a / b,
        _   => throw new Exception()
    };
    public int EvalRPN(string[] tokens) {
        var stack = new Stack<int>();
        var result = 0;
        
        foreach(var token in tokens) {
            int number = 0;
            var isNumber = int.TryParse(token, out number);
            if(isNumber) 
                stack.Push(number);
            else {
                result = evaluate(stack.Pop(), stack.Pop(), token); 
                stack.Push(result);
            }
            
        }
        
        return stack.Pop();
    }
}