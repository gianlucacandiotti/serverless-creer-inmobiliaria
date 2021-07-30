exports.handler = function (context, event, callback) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(context.SENDGRID_API_KEY);
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      callback(null, "Email sent successfully");
    })
    .catch((e) => {
      console.log(e);
      callback(e);
    });
};
