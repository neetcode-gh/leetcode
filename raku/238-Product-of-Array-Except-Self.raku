use v6.c;

class Solution {
    method productExceptSelf(Int:D @nums --> Array[Int]) {
        my @res = 1 xx @nums.elems;

        my Int:D $prefix = 1;
        for 0 ..^ +@nums -> $i {
            @res[$i] = $prefix;
            $prefix ×= @nums[$i];
        }

        my Int:D $postfix = 1;
        for +@nums ^... 0 -> $i {
            @res[$i] *= $postfix;
            $postfix ×= @nums[$i];
        }
    
        return Array[Int].new: @res;
    }
}
