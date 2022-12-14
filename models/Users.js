const mongoose = require('mongoose');
// Creamos el esquema de la colección de Usuarios //
const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true,},
    password: {type:String, required:true},


}, {
    timestamps:true
});
// Creamos el modelo de la colección de Usuarios //
const User = mongoose.model('User',userSchema);
// Exportamos el modelo de la colección de Usuarios //
module.exports = User;