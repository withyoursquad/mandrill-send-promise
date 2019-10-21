describe("Test Sending Email with Mocked https", () => {
  jest.mock('https');
  const sendEmail = require("../src/mandrill-send-promise")(process.env.mandrillAPIKey);

  const exampleEmailProps = {
    from_email: "noreply@example.com",
    from_name: "From Name",
    to_email: "to@example.com",
    to_name: "To Name",
    reply_to: "info@example.com",
    subject: "Hello from Squad!",
    html: "<!DOCTYPE html><html><head><title>Example title</title></head><body><h1>Hello!</h1><p>This is a test email.</p></body></html>",
    text: "Hello! This is a test email.",
    tags: ["test"]
  };

  it("Should throw error if there's network problem", async () => {
    try {
      global.badNetwork = true;
      await sendEmail(exampleEmailProps);
      expect(false).toBe(true);
    } catch(e) {
      expect(e.message).toBe("Network request error");
    } finally {
      global.badNetwork = false;
    }
  });

  it("Should send plain text email if no html given", async () => {
    const mandrillResponse = await sendEmail({
      ...exampleEmailProps,
      html: undefined,
      reply_to: undefined
    });

    expect(mandrillResponse.status).toBe("sent");

    // TODO: Mock Mandrill response to prove plain text claim
  });

  it("Should mark reply_to as from_email if none given", async () => {
    const mandrillResponse = await sendEmail({
      ...exampleEmailProps,
      reply_to: undefined
    });

    expect(mandrillResponse.status).toBe("sent");

    // TODO: Mock Mandrill response to prove reply_to claim
  });

  it("Should send empty tags if none given", async () => {
    const mandrillResponse = await sendEmail({
      ...exampleEmailProps,
      tags: undefined
    });

    expect(mandrillResponse.status).toBe("sent");

    // TODO: Mock Mandrill response to prove tags claim
  });

  it("Should send email successfully", async () => {
    const mandrillResponse = await sendEmail({
      ...exampleEmailProps,
      tags: undefined
    });

    expect(mandrillResponse.status).toBe("sent");
  });

});