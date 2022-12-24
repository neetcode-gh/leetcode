# @param {String[]} tokens
# @return {Integer}
def eval_rpn(tokens)
    operations = %w(+ - * /)
    nums = []
    
    tokens.each do |token|
        if operations.include?(token)
            a = nums.pop
            b = nums.pop
            
            result =  do_operation(token, b , a)
            nums << result
        else
            nums.push(token.to_i)
        end
    end
    
    nums.pop
end

def do_operation(operation, a, b)
    case operation
    when "+"
      return a + b
    when "*"
      return a * b
    when "-"
      return a - b
    when "/"
     return (a.to_f / b).to_i
    else
      raise "invalid operation #{operation}"
    end
end
