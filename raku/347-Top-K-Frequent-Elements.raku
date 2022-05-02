use v6.c;

class Solution {
    method topKFrequent(Int:D @nums, Int:D $k --> Array[Int]) {
        my %freqs;
        my @buckets = [[] xx +@nums];

        # map numbers to their frequencies.
        %freqs = @nums.Bag.hash;

        for %freqs.kv -> $n, $c {
            @buckets[$c].push: $n.Int
        }

        my Int @res;
        for +@buckets ^...^ 0 -> $i {
            for |@buckets[$i] -> $n {
                @res.push: $n;
                return Array[Int].new(@res) if +@res == $k;
            }
        }
    }
}

