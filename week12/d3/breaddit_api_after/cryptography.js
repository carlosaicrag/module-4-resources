const crypto = require('crypto');
const hasher = crypto.createHash('sha512');
hasher.update('superSecurePassword1!');
const digest = hasher.digest();
console.log(digest.toString('base64'));

const hasher2 = crypto.createHash('sha512');
hasher2.update('superSecurePassword1!');
const digest2 = hasher2.digest();
console.log(digest2.toString('base64'));

// whenever we hash the same input, using the same hashing function, we're GUARANTEED the same result
// console.log(digest2)
// console.log(digest.toString('base64') === digest2.toString('base64'));










// const password = 'superSecurePassword1!';
const util = require('util');
const salter = util.promisify(crypto.randomBytes);
const hasher3 = util.promisify(crypto.pbkdf2);



async function generateHashedPW(password) {
  // generate random salt string
  const salt = (await salter(64)).toString('base64');
  // console.log('salt', salt);
  // we add the salt to the password we're looking to hash, which will ensure the same password inputs will result in different hash outputs
  // hash('password384hduj37g21ndw8y2he');
  const hashed = (await hasher3(password, salt, 10000, 64, 'sha512')).toString('base64');
  // console.log('hashed', hashed);
  // we store the hashed output and the salt used in the db
  // we need to store the salt in the db so that we can attempt to validate the password later, by hashing an incoming password with the exact same salt
  const hashedPWForDB = `${salt}:${hashed}`;
  console.log(hashedPWForDB)
  // debugger
  return hashedPWForDB
}

const hashedPWForDB = generateHashedPW('superSecurePassword1!');

async function checkPassword(password, hashedPW) {
  debugger
  const [salt, hashed] = hashedPW.split(':');
  const attempt = await hasher3(password, salt, 10000, 64, 'sha512');
  console.log(attempt.toString('base64') === hashed.toString('base64'));
}

checkPassword(
  'superSecurePassword1!',
  "BSDbdivXven9tq6CuWIyza1t9y1KHZlQ507NRVD4lPD1NDPuHzzAs9D0fRoZaUSOd1fgVduq0JG1klIqdNXJ8g==:tHGLHaf5/J/zQPzitR74jl/riv3s3gqTupP9yTvCW0IuPyiyHSB4Kyq9IN+oj5P89YPR2KSWEUIS7TbX6Tmn2Q=="
);



'X8vZF10brEfMt6MftvzoV6oCW03gTILNSN+w/dFgr6igGmEAvR0pHTI47xeikH3nhEKeDNtHsYK7YOeS9xdciQ==:U9jPukuUH4Js/7a3ZXCc7Hg2RxcSPGHGyeiXfih4oPVOtAJgwFkJK5QL2FueT3zAfZk65DnQluCi8XZ5gbNurg=='









// password ---- hashedPW
// strongPassword+jbwedubeuiuhf jbwedubeuiuhf.uwbuhh3ue3bdwwu 
// strongPassword+dbwdwbddw dbwdwbddw.wudbwwbfbweb8yw3eyx
// strongPassword uwbuh
// strongPassword uwbuh
// strongPassword uwbuh
// strongPassword uwbuh