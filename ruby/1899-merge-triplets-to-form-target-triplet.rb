def merge_triplets(triplets, target)
    good = Set.new([])
    triplets.each do |triplet|
        next if ((triplet[0] > target[0]) || (triplet[1] > target[1]) || (triplet[2] > target[2]))
        triplet.each_with_index do |value,index|
            good.add(index) if value == target[index]
        end
    end
    return good.length == 3
end