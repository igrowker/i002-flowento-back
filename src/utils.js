import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import multer from 'multer';


// __filename apunta al archivo actual en el que estás escribiendo el código
const __filename = fileURLToPath(import.meta.url);
// __dirnamete proporciona la carpeta principal de ese archivo actual
const __dirname = dirname(__filename);

// __filename C:\Users\User\Desktop\flowento\i002-flowento-back\src\utils.js
// console.log('__filename', __filename);
// __dirname C:\Users\User\Desktop\flowento\i002-flowento-back\src
// console.log('__dirname', __dirname);


// multer
// genera el lugar de guardado
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb = callback
        // aca dependiedo del file q te llegue
        // ejem caso una img de perfil (.png, .jpg, etc)
        // lo guardas en una carpeta llamada profile
        // si es una img de producto en una carpeta llamada proeducto
        const { fieldname, mimetype } = file;

        if (mimetype.includes("/pdf") || mimetype.includes("/docx") || mimetype.includes("/xlsx") || mimetype.includes("/pptx")) {
            cb(null, `${__dirname}/public/documents`);
        }
        else if (mimetype.includes("/jpg") || mimetype.includes("/png") || mimetype.includes("/gif") || mimetype.includes("/tif") || mimetype.includes("/bmp") || mimetype.includes("/svg") || mimetype.includes("/jpeg")) {

            // fieldname te trae el nombre del input donde se subieron las iamgen, usa eso para saber si lo q se manda a multer es una imagen de un producto o otro tipo de imagen
            // esto te es util ya q el nombre de la imagen puede ser cualquier cosa por lo caul usas el input name para saber en q carpeta guardar
            if (fieldname.includes("thumbnails")) {
                cb(null, `${__dirname}/public/images/products`);
            } else {
                cb(null, `${__dirname}/public/images/profiles`);
            }
        }
        else {
            cb(null, `${__dirname}/public/videos`);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({ storage });


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