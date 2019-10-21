module.exports = {
  request : (options, responseCallback) => {
    // TODO: Mock responses based on requestData
    let requestData;
    responseCallback({
      on: (callbackName, callbackFn) => {
        switch (callbackName) {
          case "data":
            // Hex to spell out '[{"status":"sent"}]' in UTF-8
            callbackFn(Buffer.from([0x5b, 0x7b, 0x22, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x22, 0x3a, 0x22, 0x73, 0x65, 0x6e, 0x74, 0x22, 0x7d, 0x5d]));
            break;
          case "end":
            setTimeout(callbackFn, 100);
            break;
        }
      }
    });
    return {
      on: (errorString, errorCallback) => {
        if (errorString === "error" && global.badNetwork === true) {
          errorCallback(new Error("Network request error"));
        }
      },
      write: (data) => {
        requestData = data;
      },
      end: () => {}
    };
  }
};