// using .test

// 1. Add the appropriate flag to the following pattern, ensuring all calls to .test return true
const pattern = /banana/i; // i is a flag that tells us that anything that it is trying to match to can be lowercase or uppercase 
console.log(pattern.test('banana'));
console.log(pattern.lastIndex)
console.log(pattern.test('bAnAnA'));
console.log(pattern.lastIndex)
console.log(pattern.test('BANANA'));
console.log(pattern.lastIndex)

// 2. Construct a regular expression that will cause the following function calls to return the specified boolean
// const pattern2 = /^[a-z][a-z]?og$/; // your pattern here (leave the ^ and $, we want to match the entire input)
// const pattern2 = /^.r?og$/; // your pattern here (leave the ^ and $, we want to match the entire input)
// const pattern2 = /^[dlf]\w*og$/; // your pattern here (leave the ^ and $, we want to match the entire input)

// console.log(pattern2.test('dog')); //=> should return true
// console.log(pattern2.test('log')); //=> should return true
// console.log(pattern2.test('frog')); //=> should return true

// console.log(pattern2.test('balrog')); // => should return false

// using str.replace
// 3. Using the JS str.replace function, replace every vowel with a '0'
const str = 'The dog jumpEd over the mOon';
const pattern3 = /[aeiou]/ig;
console.log(str.replace(pattern3, '0')); 
console.log(str)
