func lengthOfLastWord(s string) int {
    len := 0
    for i := range s {
        if s[i] != ' ' {
            if s[i-1] == ' ' {
                len = 1
            } else {
                len += 1
            }
        }
    }
    return len
}

// another approach. starting out from the last so we don't have to go all the way to the end

func lengthOfLastWord(s string) int {
    firstCharOccurance := false
    lastWordLen := 0

    for i := len(s) - 1; i > -1; i-- {
        if s[i] != ' ' {
            firstCharOccurance = true
            lastWordLen++
        }
        if firstCharOccurance && s[i] == ' ' {
            break
        }
    }
    return lastWordLen
}
