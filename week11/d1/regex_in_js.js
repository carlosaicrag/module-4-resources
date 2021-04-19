// test => returns boolean based on whether input matches pattern
const email1 = 'b.o.b-28@gmail.com';
const email2 = 'bob28@gmail.com';
//the following pattern will not work for email1 because of the dashes and periods
const pattern = /^\w+@\w+\.\w{2,3}$/;
//the following pattern will work for both email1 and email2
// const pattern = /^(\w+[.-]?)+@\w+\.\w{2,3}$/;
// console.log(pattern.test(email1))
// console.log(pattern.test(email2))

// match => returns an array of matches
// const sentence = 'The only quick brown fox jumps over the lazy dog. It barked.';
// const pattern2 = /\w*o\w*/g;
// console.log(sentence.match(pattern2))

// replace
const data = { name: 'Charlie', age: 33 };
const str = `My name is %name%, and my age is %age%`;
const pattern3 = /%(\w+)%/g;

console.log(str.replace(pattern3, (match, p1) => {
  //what it matched with
  console.log('match', match)
  //what is in between the % signs because we wrapped it in parenthesis
  console.log('group', p1)
  return data[p1]
}))
