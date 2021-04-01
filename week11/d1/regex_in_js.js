// test => returns boolean based on whether input matches pattern
const email = 'b.o.b-28@gmail.com';
// const pattern = /^\w+@\w+\.\w{2,3}$/;
const pattern = /^(\w+[.-]?)+@\w+\.\w{2,3}$/;
// console.log(pattern.test(email))

// match => returns an array of matches
// const sentence = 'The only quick brown fox jumps over the lazy dog. It barked.';
// const pattern2 = /\w*o\w*/g;
// console.log(sentence.match(pattern2))

// replace
const data = { name: 'Charlie', age: 33 };
const str = `My name is %name%, and my age is %age%`;
const pattern3 = /%(\w+)%/g;

console.log(str.replace(pattern3, (match, p1) => {
  console.log('match', match)
  console.log('group', p1)
  return data[p1]
}))
