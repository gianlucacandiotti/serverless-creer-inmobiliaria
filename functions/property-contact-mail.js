exports.handler = function (context, event, callback) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(context.SENDGRID_API_KEY);

  if (!event.name) {
    callback("Invalid call");
    return;
  }

  const response = new Twilio.Response();

  const headers = {
    "Access-Control-Allow-Origin": "https://creerinmobiliaria.com",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  response.setHeaders(headers);

  const message = {
    to: "agents@creerinmobiliaria.com",
    from: "info@creerinmobiliaria.com",
    template_id: "d-05faa38eb5254ecbbe5354b6901c731f",
    dynamic_template_data: {
      name: event.name,
      email: event.email,
      phone: event.phone,
      message: event.message,
      call: event.call === "true",
      property: {
        address: event.propertyAddress,
        link: event.propertyLink,
      },
    },
  };

  sgMail
    .send(message)
    .then(() => {
      response.setBody("Email sent successfully");
      callback(null, response);
    })
    .catch((e) => {
      console.log(e);
      callback(e);
    });
};
