import {dirname} from 'path';
import {fileURLToPath} from 'url';

// __filename apunta al archivo actual en el que estás escribiendo el código
const __filename = fileURLToPath(import.meta.url);
// __dirnamete proporciona la carpeta principal de ese archivo actual
const __dirname = dirname(__filename);

// __filename C:\Users\User\Desktop\flowento\i002-flowento-back\src\utils.js
// console.log('__filename', __filename);
// __dirname C:\Users\User\Desktop\flowento\i002-flowento-back\src
// console.log('__dirname', __dirname);

export default __dirname;