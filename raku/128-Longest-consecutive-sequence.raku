use v6.c;

class Solution {
    method longestConsecutive(Int:D @nums --> Int:D) {
        my $num-set = Set[Int].new(@nums);
        my Int $longest = 0;

        for @nums -> $num {
            if ($num - 1) !∈ $num-set {
                my $length = 0;
                $length += 1 while ($num + $length) ∈ $num-set;
                $longest = max($length, $longest);
            }
        }

        return $longest;
    }
}
