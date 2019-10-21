/*
  To run this example:
  1) Find your test api key in Mandrill's dashboard
  1) open your Terminal
  2) cd into this folder
  3) run: node -e "require('./sendEmail').sendExampleEmail(MANDRILL_API_KEY)"
 */

module.exports = {
  sendExampleEmail: async (apiKey) => {
    const sendEmail = require('../src/mandrill-send-promise')(apiKey || process.env.mandrillAPIKey);
    const mandrillResponse = await sendEmail({
      from_email: "noreply@example.com",
      from_name: "From Name",
      to_email: "to@example.com",
      to_name: "To Name",
      reply_to: "info@example.com",
      subject: "Hello from Squad!",
      get html() {
        return `<!DOCTYPE html><html><head><title>${this.subject}</title><style type="text/css">h1,p{width:'200px',max-width:'90%',margin:auto,text-align:'center'}</style></head><body><h1>Hello!</h1><p>This is a test email.</p></body></html>`;
      },
      text: 'Hello! This is a test email.',
      tags: ['test']
    });
    console.log(mandrillResponse);
  }
};