const db = require('../config/config')

const Rol_ad_us = {};

Rol_ad_us.create = (id_user,id_rol) => {
    const sql = `
    
        INSERT INTO 
            user_has_roles_usad(
                id_user,
                id_rol,
                created_at,
                updated_at
            ) 
        VALUES($1 , $2 , $3 , $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
        
    ]);
}

module.exports = Rol_ad_us;
