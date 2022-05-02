use v6.c;

#
# It could also be implemented as the one-liner:
#
#     $s.comb.Bag == $t.comb.Bag
#

class Solution {
    method isAnagram(Str:D $s, Str:D $t --> Bool:D) {
        return False if $s.chars != $t.chars;

        my Int %countS;
        my Int %countT;

        for 0 ..^ $s.chars -> $i {
            %countS{ $s.substr($i, 1) } += 1;
            %countT{ $t.substr($i, 1) } += 1;
        }

        for %countS.keys -> $c {
            return False unless %countS{$c} == (%countT{$c} // 0);
        }

        return True
    }
}

