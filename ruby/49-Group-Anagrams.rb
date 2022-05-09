# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
  dic = {}
  strs.each  do |item|
      count = Array.new(26)
      a_ord = 'a'.ord
      item.scan(/./) do |letter|  
          index = letter.ord - a_ord
          count[index] = count[index] == nil ? 1 : count[index].to_i+1
      end
      key = count
      dic[key] = dic[key] != nil ? dic[key].push(item) : [item]
  end
  dic.values
end