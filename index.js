const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
  sandbox: true,
  access_token:
    "TEST-50734572453772-062010-3d08b9466f9e59660ec1512f4d3879df-61075389",
});

app.get("/pagar", async (request, response) => {
  var id = String(Date.now());
  var email = "marciano@hotmail.com";

  var dados = {
    items: [
      (item = {
        id: id,
        title: "descrição qualquer",
        quantity: 1,
        currency_id: "BRL",
        unit_price: parseFloat(100),
      }),
    ],
    payer: {
      email: email,
    },
    external_reference: id,
  };

  try {
    var pagamento = await MercadoPago.preferences.create(dados);
    return response.redirect(pagamento.body.init_point);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, (require, response) => {
  console.log("Aplicação rodando!");
});
