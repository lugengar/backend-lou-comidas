const bcrypt = require('bcryptjs');

const password = 'loucomidas';  // La contraseña que deseas guardar
bcrypt.hash(password, 10).then(hash => {
  console.log(hash);  // Guarda este hash en tu archivo .env
});
