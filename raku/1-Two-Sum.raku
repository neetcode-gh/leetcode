use v6.c;

class Solution {
    method twoSum(Int:D @nums, Int:D $target --> Array[Int]) {
        my Int %seen-diff;

        for @nums.kv -> $i, $num {
            my $diff = $target - $num;
            return Array[Int].new(%seen-diff{$diff}, $i) if %seen-diff{$diff}:exists;
            %seen-diff{$num} = $i;
        }
    }
}
