const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Evento } = require("../models");


//actualizar imagenes usando cloudinary
const actualizarImgCloudinary = async (req, res = response) => {

    const { coleccion, id } = req.params;

    
    let folder = "TimeMachine"

    let modeloEvento = {};
    let modeloChar1 = {};
    let modeloChar2 = {};

    switch (coleccion) {
        case 'char1':

            modeloChar1 = await Evento.findById(id)
            if (!modeloChar1) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            if (modeloChar1.personajes) {
                console.log(modeloChar1.personajes[0]);
                //Borrar la imagen antigua del servidor
                const nombreArr = modeloChar1.personajes[0].img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
        
                const [public_id] = nombre.split('.');
                console.log(public_id);
        
                await cloudinary.uploader.destroy(folder + '/' + coleccion + '/' + public_id);
        
                //console.log(req.files.archivo);
                const { tempFilePath } = req.files.archivo // los archivos se guardan temporalmente en un archivo, ese se puede subir
        
                const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: folder + '/' + coleccion }) // subir la iamgen a cloudinary, sube el path en resumen
        
                modeloChar1.personajes[0].img = secure_url
        
                await modeloChar1.save();
        
                res.json(modeloChar1);
            }

            break;
        case 'char2':

            modeloChar2 = await Evento.findById(id)
            if (!modeloChar2) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            if (modeloChar2.personajes) {
                console.log(modeloChar2.personajes[1]);
                //Borrar la imagen antigua del servidor
                const nombreArr = modeloChar2.personajes[1].img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
        
                const [public_id] = nombre.split('.');
                console.log(public_id);
        
                await cloudinary.uploader.destroy(folder + '/' + coleccion + '/' + public_id);
        
                //console.log(req.files.archivo);
                const { tempFilePath } = req.files.archivo // los archivos se guardan temporalmente en un archivo, ese se puede subir
        
                const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: folder + '/' + coleccion }) // subir la iamgen a cloudinary, sube el path en resumen
        
                modeloChar2.personajes[1].img = secure_url
        
                await modeloChar2.save();
        
                res.json(modeloChar2);
            }
            
            break;

        case 'eventos':

            modeloEvento = await Evento.findById(id)
            if (!modeloEvento) {
                return res.status(400).json({
                    msg: `No existe un evento con el id ${id}`
                })
            }

            if (modeloEvento) {
                //Borrar la imagen antigua del servidor
                const nombreArr = modeloEvento.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
        
                const [public_id] = nombre.split('.');
                console.log(public_id);
        
                await cloudinary.uploader.destroy(folder + '/' + coleccion + '/' + public_id);
        
                //console.log(req.files.archivo);
                const { tempFilePath } = req.files.archivo // los archivos se guardan temporalmente en un archivo, ese se puede subir
        
                const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: folder + '/' + coleccion }) // subir la iamgen a cloudinary, sube el path en resumen
        
                modeloEvento.img = secure_url
        
                await modeloEvento.save();
        
                res.json(modeloEvento);
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });

    }

    // Limpiar imagen previa
  



}

const mostrarImagen = async (req, res = response) => {

    // se podria crear un helper que retorne el modelo** pero que tigra...


    const { coleccion, id } = req.params;

    let modelo;


    switch (coleccion) {
        /* case 'usuarios':

            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break; */

        case 'eventos':

            modelo = await Evento.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un evento con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido programar esto' });

    }

    // Limpiar imagen previa
    if (modelo.img) {
        //Borrar la imagen del servidor

        //obtenemos la ruta
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        // preguntamos si existe y si existe la borramos
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }

    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);


}

module.exports = {

    mostrarImagen,
    actualizarImgCloudinary

}