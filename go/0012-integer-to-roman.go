import "strings"

func intToRoman(num int) string {
	integer := [13]int{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}
	roman := [13]string{"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}

	var sb strings.Builder
	for i := 0; i < 13; i++ {
		if num/integer[i] > 0 {
			count := num / integer[i]
			for count > 0 {
				sb.WriteString(roman[i])
				count--
			}
			num = num % integer[i]
		}
	}
	return sb.String()
}
