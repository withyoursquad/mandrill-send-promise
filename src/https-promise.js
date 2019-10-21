const https = require('https');

module.exports = (options, data, {resolve, reject}) => {
  const responseBody = [];

  try {
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        responseBody.push(d);
      });

      res.on('end', () => {
        resolve(Buffer.concat(responseBody).toString());
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end()
  } catch(e) {
    reject(e);
  }
};