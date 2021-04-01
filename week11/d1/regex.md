# regex

optional: att? ⇒ a, t, zero or one t

star: th*e ⇒ t, zero or more h, e 

plus: at+ ⇒ a, one or more t  / r + ⇒ r, one or more spaces

dot: e . ⇒ e, space, any char

hat: ^is ⇒ start of input, i, s

dollar: at.$ ⇒ a, t, any char, end of input

square: a[tm]e ⇒ a, t or m, e / [whP]+at ⇒ one or more (w,h,P) , a , t

dash: [a-zA-z]at ⇒ any lower/upper letter, a, t

hat in []: [^a-zA-Z] ⇒ any non-letter char

parenthesis: at( is)? ⇒ a,t,optional (space, i,s)

\s === whitespace (space, tab, newline)

\d === digit

\w === word char

\S ≠ whitespace

\D ≠ digit

\W ≠ word char