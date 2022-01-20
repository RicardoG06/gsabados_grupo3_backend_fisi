const db = require('../config/config');
const bcrypt = require('bcryptjs');

const Trabajador = {};

Trabajador.getAll = () => {
    const sql = `SELECT * FROM trabajador`;
    return db.manyOrNone(sql);
}

Trabajador.create = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);

    const sql = `INSERT INTO trabajador (email,name,lastname,dni,edad,phone,image,password,disponibilidad,precio_x_hora_cuidado,precio_x_hora_paseo,direccion,distrito,popularidad,created_at,updated_at) VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9 ,$10 ,$11 ,$12 ,$13 ,$14 ,$15, $16) RETURNING id `;

    return db.many(sql, [
        user.email,
        user.name,
        user.lastname,
        user.dni,
        user.edad,
        user.phone,
        user.image,
        hash,
        user.disponibilidad,
        user.precio_x_hora_cuidado,
        user.precio_x_hora_paseo,
        user.direccion,
        user.distrito,
        user.popularidad,
        new Date(),
        new Date()
    ]);
}



Trabajador.findByEmail = (email) => {
    const sql = `
    SELECT 
        id,
	    email,
	    name,
	    lastname,
        dni,
        edad,
	    image,
	    phone,
	    password,
	    session_token,
        disponibilidad,
        precio_x_hora_cuidado,
        precio_x_hora_paseo,
        direccion,
        distrito,
        popularidad
    FROM
	    trabajador
    WHERE 
	    email = $1
    `;

        return db.oneOrNone(sql, email);
}

Trabajador.findById = (id, callback) => {
    const sql = `
    SELECT 
	    id,
	    email,
	    name,
	    lastname,s
        dni,
        edad,
	    image,
	    phone,
	    password,
	    session_token,
        disponibilidad,
        precio_x_hora_cuidado,
        precio_x_hora_paseo,
        direccion,
        distrito,
        popularidad,
    FROM
        trabajador
    WHERE 
	    id = $1
    `;

        return db.oneOrNone(sql, id).then(user => { callback(null, user)})
}

module.exports = Trabajador;