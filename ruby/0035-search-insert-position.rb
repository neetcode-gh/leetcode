# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer}
def search_insert(nums, target)
    low = 0
    high = nums.length - 1

    while low <= high
        mid = low + (high - low) / 2

        if nums[mid] == target
            return mid
        elsif nums[mid] < target
            low = mid + 1
        else
            high = mid - 1
        end
    end

    return low
end