module.exports = (apiKey) => {
  if (typeof apiKey === "string") {
    return async ({from_email, from_name, to_email, to_name, reply_to, subject, html, text, tags}) => {
      const emailData = {
        from_email,
        from_name,
        to: [
          {
            "email" : to_email,
            "name" : to_name,
            "type" : "to"
          }
        ],
        "headers" : {
          "Reply-To": reply_to || from_email
        },
        subject,
        html: html || text,
        text,
        tags : tags || []
      };

      const mandrillResponse = await new Promise((resolve, reject) =>
        sendEmail(apiKey, { message : emailData }, {resolve, reject})
      );

      return validateResponse(mandrillResponse);
    }
  } else {
    throw new Error("Mandrill API Key Required");
  }
};

function sendEmail(apiKey, emailObject, promise) {
  const emailData = JSON.stringify({
    ...emailObject,
    key : apiKey
  });

  const mandrillAPIPath = "/api/1.0/messages/send.json";
  const options = {
    hostname: "mandrillapp.com",
    port: 443,
    path: mandrillAPIPath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': emailData.length
    }
  };

  require('./https-promise')(options, emailData, promise);
}

function validateResponse(responseString) {
  const responseObj = JSON.parse(responseString);

  if (responseObj.status === "error") {
    throw responseObj;
  } else if (
    responseObj[0].status === "rejected"
    || responseObj[0].status === "invalid"
  ) {
    throw responseObj[0];
  } else {
    return responseObj[0];
  }
}