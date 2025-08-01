package mypkg

import (
	"unicode/utf8"
)

func String2Code(s string) int {
	var i int
	if utf8.RuneCountInString(s) == 1 && s[0] < 128 {
		i = int(s[0])
	}
	return i
}

func Code2String(i int) string {
	var s string
	if 0 <= i && i < 128 {
		s = string(rune(i))
	}
	return s
}
