func isIsomorphic(s string, t string) bool {
	mapS, mapT := make(map[byte]byte), make(map[byte]byte)
	for i := range s {
		charS, charT := s[i], t[i]
		charSVal, sExist := mapS[charS]
		charTVal, tExist := mapT[charT]
		if (sExist && charSVal != charT) || (tExist && charTVal != charS) {
			return false
		}
		mapS[charS] = charT
		mapT[charT] = charS
	}
	return true
}
