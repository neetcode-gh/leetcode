require 'rubygems'
require 'algorithms'
include Containers

def last_stone_weight(stones)
  heap = MaxHeap.new
  stones.each { |stone| heap << stone }
  until heap.size <= 1
    stone1 = heap.pop
    stone2 = heap.pop
    heap << (stone1 - stone2).abs if stone1 != stone2
  end
  last = heap.pop
  last.nil? ? 0 : last
end
