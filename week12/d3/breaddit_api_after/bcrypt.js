const bcrypt = require('bcryptjs');

async function generatePW(password) {
  console.log(await bcrypt.hash(password, 8));
}

async function checkPassword(password, email) {
  const user = await User.findOne({where: email})
  const isPassword = await bcrypt.compare(password, user.hashedPW);
  if (isPassword) {
    console.log('user verified');
  } else {
    console.log('invalid login credentials');
  }
}

// generatePW('password');

checkPassword('password', '$2a$08$kFpaeYbJWYR05hhHCj0PSeeSJLk4Rocrr9obOiohKshU4Z8KQnnfq');