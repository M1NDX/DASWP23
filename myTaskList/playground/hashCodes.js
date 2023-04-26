const bcrypt = require('bcryptjs');

let hash = bcrypt.hashSync("es es mi password", 10);

console.log(hash);

if(bcrypt.compareSync("es es mi password",hash))
  console.log("si es valido");
else
 console.log("invalido ");