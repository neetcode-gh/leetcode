package validparentheses

import (
	"testing"
)

func Test_isValid(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "case1",
			args: args{
				s: "()",
			},
			want: true,
		},
		{
			name: "case2",
			args: args{
				s: "()[]{}",
			},
			want: true,
		},
		{
			name: "case3",
			args: args{
				s: "(]",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isValid(tt.args.s); got != tt.want {
				t.Errorf("isValid() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_isValid_2(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "case1",
			args: args{
				s: "()",
			},
			want: true,
		},
		{
			name: "case2",
			args: args{
				s: "()[]{}",
			},
			want: true,
		},
		{
			name: "case3",
			args: args{
				s: "(]",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isValid_2(tt.args.s); got != tt.want {
				t.Errorf("isValid_2() = %v, want %v", got, tt.want)
			}
		})
	}
}
