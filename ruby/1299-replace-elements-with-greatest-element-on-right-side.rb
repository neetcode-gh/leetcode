# @param {Integer[]} arr
# @return {Integer[]}

#naive/brute force approach: time = O(n^2), space = O(n)
def replace_elements(arr)
    ans = []
    (0...arr.length - 1).each do |idx|
         ans << arr.slice(idx + 1, arr.length).max
    end
    ans << - 1
    ans
end

#iterate backwards while keeping track of previous max: time = O(n), space = O(1)
def replace_elements(arr)
    max_right = -1
    (arr.length - 1).downto(0).each do |idx|
        new_max = [max_right, arr[idx]].max
        arr[idx] = max_right
        max_right = new_max
    end
    arr
end