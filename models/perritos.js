const db = require('../config/config');

const Perritos = {};

Perritos.getAll = () => {
    const sql = `SELECT * FROM perritos`;
    return db.manyOrNone(sql);
}

Perritos.create = async (perrito) => {

    const sql = `INSERT INTO perritos (name,descripcion,raza,edad,image,id_user,created_at,updated_at) VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8) RETURNING id`;

    return db.oneOrNone(sql, [
        perrito.name,
        perrito.descripcion,
        perrito.raza,
        perrito.edad,
        perrito.image,
        perrito.id_user,
        new Date(),
        new Date()
    ]);
}

Perritos.update = (perrito) => {
    const sql = `UPDATE perritos SET name = $2, descripcion = $3, raza = $4, edad = $5, image = $6, updated_at = $7 WHERE id = $1`;
    
    return db.none(sql,[
        perrito.name,
        perrito.descripcion,
        perrito.raza,
        perrito.edad,
        perrito.image
    ]);
}



module.exports = Perritos