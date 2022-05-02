use v6.c;

#
# It can be also implemented as the one-liner:
#
#     @strs.classify({ $_.lc.comb.Bag }).values
#

class Solution {
    method groupAnagrams(Str:D @strs) {
        my %res;

        for @strs -> $str {
            my @count = 0 xx 26;
            for $str.comb -> $char {
                @count[$char.lc.ord - 'a'.ord] += 1
            }

            %res{ @count.join }.push: $str
        }

        return %res.values;
    }
}
