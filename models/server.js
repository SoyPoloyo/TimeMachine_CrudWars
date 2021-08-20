express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server {
    //levantando el servidor
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //http de las rutas
        this.paths = {
            eventos: '/api/eventos',
            uploads: '/api/uploads',
            buscar: '/api/buscar',

        }
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // habilita que se cree la carpeta si no existe
        }));
    }

    routes() {
        this.app.use(this.paths.eventos, require('../routes/eventos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo correctamente, puerto: ${this.port}`);
        })
    }
}

module.exports = Server;