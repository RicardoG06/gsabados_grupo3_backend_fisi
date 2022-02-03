const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.getAll = () => {
    const sql = `SELECT * FROM users`;
    	return db.manyOrNone(sql);
}

User.create = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);

    const sql = `INSERT INTO users (email,name,lastname,dni,edad,phone,image,password,created_at,updated_at) VALUES ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8 ,$9 ,$10) RETURNING id`;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.dni,
        user.edad,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ]);
}

User.findByEmail = (email) => {
    const sql = `SELECT
	U.id,
	U.email,
	U.name,
	U.lastname,
	U.dni,
	U.edad,
	U.image,
	U.phone,
	U.password,
	U.session_token,
	json_agg(
		json_build_object(
			'id',Pe.id,
			'name',Pe.name,
			'descripcion',Pe.descripcion,
			'raza',Pe.raza,
			'edad', Pe.edad,
			'image',Pe.image,
			'id_user',Pe.id_user
		)
	) AS perr,
	json_agg(
        json_build_object(
            'id',R.id,
            'name',R.name,
            'image',R.image,
            'route',R.route
        )
    ) AS rol
		FROM
			users AS U
		LEFT JOIN
			perritos AS Pe
		ON
			Pe.id_user = U.id	
		INNER JOIN 
			user_has_roles_usad AS UHRU
		ON
			UHRU.id_user = U.id
		INNER JOIN
			roles_usur_admin AS R
		ON 
			R.id = UHRU.id_rol
		WHERE 
			U.email = $1
		GROUP BY
			U.id
    	`;

        return db.oneOrNone(sql, email);
}

User.findById = (id, callback) => {
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
	    session_token
    FROM
	    users
    WHERE 
	    id = $1
    `;

        return db.oneOrNone(sql, id).then(user => { callback(null, user)})
}

User.update = (user) => {
	const sql = `
		UPDATE
			users
		SET
			name = $2,
			lastname = $3,
			phone = $4,
			dni = $5,
			edad = $6,
			image = $7,
			updated_at = $8
		WHERE
			id = $1
	`;

	return db.none(sql,[
		user.id,
		user.name,
		user.lastname,
		user.phone,
		user.dni,
		user.edad,
		user.image,
		new Date()

	]);
}

User.updateSessionToken = (id_user, session_token) => {
	const sql = `
		UPDATE
			users
		SET
			session_token = $2
		WHERE
			id = $1
	`;

	return db.none(sql,[
		id_user,
		session_token
	]);
}

module.exports = User;