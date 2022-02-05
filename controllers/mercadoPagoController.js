const mercadoPago = require('mercadopago')

mercadoPago.configure({
    sandbox : true,
    access_token : 'TEST-2618165342880021-020407-aeb3404942be56b4f36492499d0c95ec-1068540677'
});

module.exports = {

    async createPayment(req, res, next){

        let payment = req.body;

        console.log('Datos enviados' , payment);

        const payment_data = {
            transaction_amount: payment.transaction_amount,
            token: payment.token,
            description: payment.description,
            installments: payment.installments,
            payment_method_id: payment.paymentMethodId,
            issuer_id: payment.issuer_id,
            payer: {
              email: payment.payer.email,
            }
          };

          const data = await mercadoPago.payment.create(payment_data).catch((err) => {
              console.log('Error:',err);
              return res.status(501).json({
                  message: `Error al crear el pago: ${err}`,
                  success: false,
                  error: err
              });
          })

          if (data){
              // EL PAGO SE REALIZO CORRECTAMENTE

              return res.status(201).json({
                message: `El pago se ha realizo correctamente`,
                success: true,
                data: data.response
              })
          }
          else{
              // EL PAGO NO SE REALIZO CORRECTAMENTE
              return res.status(501).json({
                message: `Error algun dato esta mal en la peticion: ${err}`,
                success: false,
            });
          }
    }



}