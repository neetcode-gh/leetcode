impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        let mut stack: Vec<i32> = Vec::new();

        for token in tokens {
            match &token[..] {
                "+" => {
                    let second_operand = stack.pop().unwrap();
                    let first_operand = stack.pop().unwrap();
                    stack.push(first_operand + second_operand)
                }
                "-" => {
                    let second_operand = stack.pop().unwrap();
                    let first_operand = stack.pop().unwrap();
                    stack.push(first_operand - second_operand)
                }
                "*" => {
                    let second_operand = stack.pop().unwrap();
                    let first_operand = stack.pop().unwrap();
                    stack.push(first_operand * second_operand)
                }
                "/" => {
                    let second_operand = stack.pop().unwrap();
                    let first_operand = stack.pop().unwrap();
                    stack.push(first_operand / second_operand)
                }
                value => stack.push(value.parse::<i32>().unwrap()),
            }
        }

        stack[0]
    }
}
