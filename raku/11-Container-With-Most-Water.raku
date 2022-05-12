use v6.c;

class Solution {
    method maxArea(Int @height --> Int:D) {
        my $maxArea = 0;

        my ($l, $r) = 0, @height.end;
        until $l == $r {
            my $currArea = ($r - $l) * min(@height[$l], @height[$r]);
            $maxArea = max $maxArea, $currArea;

            if @height[$l] < @height[$r] { $l += 1 }
            else                         { $r -= 1 }
        }

        return $maxArea;
    }
}
