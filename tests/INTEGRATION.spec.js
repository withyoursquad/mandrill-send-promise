describe("Test Sending Email", () => {
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

  it("Should throw error if called without api key", async () => {
    const sendEmail = require("../src/mandrill-send-promise");
    try {
      await sendEmail(exampleEmailProps);

      // Error should have been thrown above
      expect(false).toBe(true);
    } catch({message}) {
      expect(message).toBe("Mandrill API Key Required");
    }
  });

  it("Should throw error if attempting to send to bad email", async () => {
    const sendEmail = require("../src/mandrill-send-promise")(process.env.mandrillAPIKey);
    try {
      await sendEmail(exampleEmailProps);

      // Error should have been thrown above
      expect(false).toBe(true);
    } catch({status, reject_reason}) {
      expect(status).toBe("rejected");
      expect(reject_reason).toBe("global-block");
    }
  });

  it("Should attempt emailing invalid address and be told it's invalid", async () => {
    const sendEmail = require("../src/mandrill-send-promise")(process.env.mandrillAPIKey);
    try {
      await sendEmail({
        ...exampleEmailProps,
        to_email: "****",
      });

      // Error should have been thrown above
      expect(false).toBe(true);
    } catch({status, reject_reason}) {
      expect(status).toBe("invalid");
      expect(reject_reason).toBe(null);
    }
  });

  it("Should attempt email and fail because from domain is unsigned", async () => {
    const sendEmail = require("../src/mandrill-send-promise")(process.env.mandrillAPIKey);
    try {
      await sendEmail({
        ...exampleEmailProps,
        to_email: "squadopensource+test.to@gmail.com",
        from_email: "squadopensource+test.from@gmail.com",
        reply_to: "squadopensource+test.from@gmail.com",
      });
    } catch({status, reject_reason}) {
      expect(status).toBe("rejected");
      expect(reject_reason).toBe("unsigned");
    }
  });

  it("Should attempt and fail to send email without all required input", async () => {
    const sendEmail = require("../src/mandrill-send-promise")(process.env.mandrillAPIKey);
    try {
      await sendEmail({
        ...exampleEmailProps,
        to_email: "",
      });

      // Error should have been thrown by now
      expect(false).toBe(true);
    } catch ({status, code, name}) {
      expect(status).toBe("error");
      expect(code).toBe(-2);
      expect(name).toBe("ValidationError");
    }
  });



});