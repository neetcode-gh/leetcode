require "rb_heap"

class KthLargest
  def initialize(k, nums)
    @k = k
    @heap = Heap.new
    nums.each { |num| @heap << num }
    @heap.pop until @heap.size <= @k
  end

  def add(val)
    @heap << val
    @heap.pop until @heap.size <= @k
    @heap.peak
  end
end
