const db = require('../config/config');
const bcrypt = require('bcryptjs');

const Trabajador = {};

Trabajador.getAll = () => {
    const sql = `SELECT 
    Tr.id,
    Tr.email,
    Tr.name,
    Tr.lastname,
    Tr.dni,
    Tr.edad,
    Tr.image,
    Tr.phone,
    Tr.password,
    Tr.session_token,
    disp.dia_trabajo AS disp, 
    Tr.precio_x_hora_cuidado,
    Tr.precio_x_hora_paseo,
    Tr.direccion,
    dist.nombre_distrito AS dist, 
    Tr.popularidad,
    json_agg(
    json_build_object(
        'id',R.id,
        'name',R.name
    )
) AS rol
FROM
    trabajador AS Tr
INNER JOIN dias_trabajo AS disp ON
    disp.id = Tr.disponibilidad	
INNER JOIN distrito AS dist ON
    dist.id = Tr.distrito
INNER JOIN trab_has_roles_pacu AS UHRP ON
    UHRP.id_user = Tr.id
INNER JOIN roles_pas_cui as R ON
    R.id = UHRP.id_rol
GROUP BY
    Tr.id,
    disp.dia_trabajo,
    dist.nombre_distrito
`;
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

Trabajador.findByrol = (id_rol) => {
    const sql = `SELECT 
    Tr.id,
    Tr.email,
    Tr.name,
    Tr.lastname,
    Tr.dni,
    Tr.edad,
    Tr.image,
    Tr.phone,
    Tr.password,
    Tr.session_token,
    disp.dia_trabajo AS disp, 
    Tr.precio_x_hora_cuidado,
    Tr.precio_x_hora_paseo,
    Tr.direccion,
    dist.nombre_distrito AS dist, 
    Tr.popularidad,
    json_agg(
    json_build_object(
        'id',R.id,
        'name',R.name
    )
) AS rol
FROM
    trabajador AS Tr
INNER JOIN dias_trabajo AS disp ON
    disp.id = Tr.disponibilidad	
INNER JOIN distrito AS dist ON
    dist.id = Tr.distrito
INNER JOIN trab_has_roles_pacu AS UHRP ON
    UHRP.id_user = Tr.id
INNER JOIN roles_pas_cui as R ON
    R.id = UHRP.id_rol
WHERE 
    R.id = $1
GROUP BY
    Tr.id,
    disp.dia_trabajo,
    dist.nombre_distrito
`;
    return db.manyOrNone(sql , id_rol);
}

module.exports = Trabajador;