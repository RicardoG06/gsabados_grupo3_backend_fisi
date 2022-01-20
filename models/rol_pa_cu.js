const db = require('../config/config')

const Rol_cu_pa = {};

Rol_cu_pa.create = (id_user,id_rol) => {
    const sql = `
    
        INSERT INTO 
            trab_has_roles_pacu(
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

module.exports = Rol_cu_pa;
