class MinStack
  def initialize
    @stack = []
  end

  def push(val)
    min = if @stack.empty?
        val
      else
        val < @stack.last[1] ? val : @stack.last[1]
      end

    @stack << [val, min]
    nil
  end

  def pop
    @stack.pop
    nil
  end

  def top
    return nil if @stack.empty?

    @stack.last[0]
  end

  def get_min
    return nil if @stack.empty?

    @stack.last[1]
  end
end
