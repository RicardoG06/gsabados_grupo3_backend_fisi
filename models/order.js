const db = require('../config/config')

const Order = {};

Order.create = (order) => {
    const sql =
    `INSERT INTO
        orders(
            id_user,
            nombre_cuidador,
            popularidad_cuidador,
            precio_x_hora_cuidador,
            precio_x_hora_paseador,
            imagen_trabajador,
            precio_total,
            nombre_perrito,
            raza_perrito,
            fecha_cuidado,
            hora_inicio,
            horas_servicio,
            direccion_cliente,
            referencia_cliente,
            status,
            timestamp,
            created_at,
            updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id_orden

    `;

    return db.oneOrNone(sql, [

        order.id_user,
        order.nombre_cuidador,
        order.popularidad_cuidador,
        order.precio_x_hora_cuidador,
        order.precio_x_hora_paseador,
        order.imagen_trabajador,
        order.precio_total,
        order.nombre_perrito,
        order.raza_perrito,
        order.fecha_cuidado,
        order.hora_inicio,
        order.horas_servicio,
        order.direccion_cliente,
        order.referencia_cliente,
        order.status,
        Date.now(),
        new Date(),
        new Date()

    ]);
}

module.exports = Order