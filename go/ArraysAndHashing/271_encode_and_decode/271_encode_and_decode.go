package encodeanddecode

import (
	"fmt"
	"strconv"
	"strings"
)

func encode(strs []string) string {
	delimiter := "#"
	for i := 0; i < len(strs); i++ {
		strs[i] = strconv.Itoa(len(strs[i])) + delimiter + strs[i]
	}
	return strings.Join(strs, "")
}

func decode(str string) []string {
	var result []string
	i := 0

	for i < len(str) {
		j := i
		for str[j] != '#' {
			j += 1
		}
		lengthOfString, _ := strconv.Atoi(str[i:j])
		fmt.Println(i, lengthOfString)
		result = append(result, str[j+1:j+1+lengthOfString])
		i = j + 1 + lengthOfString
		fmt.Println(i)
	}
	return result
}
