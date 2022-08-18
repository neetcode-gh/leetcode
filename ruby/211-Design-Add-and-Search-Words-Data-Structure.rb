class WordDictionary
  def initialize(root = {})
    @root = root
  end

  def add_word(word)
    curr = @root
    word.each_char do |char|
      curr[char] ||= {}
      curr = curr[char]
    end
    curr["END"] = true
  end

  def search(word)
    search_word(word, @root)
  end

  def search_word(word, root)
    curr = root
    word.each_char.with_index do |char, idx|
      if word[idx] != "."
        return false unless curr[char]

        curr = curr[char]
      else
        return curr.keys.any? do |key|
                 key == "END" ? false : search_word(word[(idx + 1)..-1], curr[key])
               end
      end
    end
    !!curr["END"]
  end
end
