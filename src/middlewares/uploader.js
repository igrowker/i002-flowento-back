import multer from 'multer';
import __dirname from '../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb = callback
        // aca dependiedo del file q te llegue
        // ejem caso una img de perfil (.png, .jpg, etc)
        // lo guardas en una carpeta llamada profile
        // si es una img de producto en una carpeta llamada proeducto
        const { fieldname, mimetype } = file;

        if (mimetype.includes("/jpg") || mimetype.includes("/png") || mimetype.includes("/gif") || mimetype.includes("/tif") || mimetype.includes("/bmp") || mimetype.includes("/svg") || mimetype.includes("/jpeg")) {

            // fieldname te trae el nombre del input donde se subieron las iamgen, usa eso para saber si lo q se manda a multer es una imagen de un producto o otro tipo de imagen
            // esto te es util ya q el nombre de la imagen puede ser cualquier cosa por lo caul usas el input name para saber en q carpeta guardar
            cb(null, `${__dirname}/public/img`);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({ storage });