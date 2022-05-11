use v6.c;

class Solution {
    method threeSum(Int:D @nums is copy) {
        my @triplets;
        @nums = @nums.sort;

        for 0 .. @nums.end -> $i {
            next if $i > 0 and @nums[$i] == @nums[$i-1];

            my ($left, $right) = ($i + 1, @nums.end);
            while $left < $right {
                my $threeSum = @nums[$i] + @nums[$left] + @nums[$right];

                if $threeSum > 0 {
                    $right -= 1
                }
                elsif $threeSum < 0 {
                    $left += 1
                }
                else {
                    @triplets.push: (@nums[$i], @nums[$left], @nums[$right]);
                    $left += 1;
                    $left += 1 while @nums[$left] == @nums[$left-1] and $left < $right;
                }
            }
        }

        return @triplets;
    }
}
