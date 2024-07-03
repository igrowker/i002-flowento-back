import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

// __filename apunta al archivo actual en el que estás escribiendo el código
const __filename = fileURLToPath(import.meta.url);
// __dirnamete proporciona la carpeta principal de ese archivo actual
const __dirname = dirname(__filename);

// __filename C:\Users\User\Desktop\flowento\i002-flowento-back\src\utils.js
// console.log('__filename', __filename);
// __dirname C:\Users\User\Desktop\flowento\i002-flowento-back\src
// console.log('__dirname', __dirname);


export const findIndex = (id,array) => {

    const index = array.findIndex(element => element.id === parseInt(id));

    return index;
}

export const createHashPassword = async(password)=>{
    const saltRound = 10;

    const salts = await bcrypt.genSalt(saltRound);

    return bcrypt.hash(password,salts);
}

export const isValidPassword = async (password,user)=> await bcrypt.compare(password, user.password);

export default __dirname;