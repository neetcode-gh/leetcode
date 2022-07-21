class Trie
  END_OF_WORD = "END"

  def initialize
    @root = {}
  end

  def insert(word)
    curr = @root
    word.each_char do |char|
      curr[char] ||= {}
      curr = curr[char]
    end
    curr[END_OF_WORD] = true
    nil
  end

  def search(word)
    curr = @root
    word.each_char do |char|
      return false unless curr[char]

      curr = curr[char]
    end
    !!curr[END_OF_WORD]
  end

  def starts_with(prefix)
    curr = @root
    prefix.each_char do |char|
      return false unless curr[char]

      curr = curr[char]
    end
    true
  end
end
