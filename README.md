# Send Email (via Mandrill, with promises)

A simple utility function without any dependencies that sends email via Mandrill's REST API and returns a Promise.

#### Why use this?
While Mandrill provides their own NodeJS SDK, it is 3000 lines of code, includes dozens of unrelated functions, and is callback-based.

Other public utilities (e.g. `mandrill-send`) are callback-based and have dependencies that must be updated to remain secure and stable. [Dependencies are hell](http://russelljanderson.com/dependency-hell/).

`mandrill-send-promise` is promise-based, has 100% test coverage, and has no dependencies.

## Installation
Run `yarn add mandrill-send-promise`.

## Setup

Import `mandrill-send-promise` into the file where you want to send your email. 
```
const sendEmail = require('mandrill-send-promise')('API_KEY');
```

## Usage
Call that `sendEmail` function with an object parameter that includes all required fields.
```
sendEmail(
  {
    from_email: "noreply@example.com",
    from_name: "From Name",
    to_email: "to@example.com",
    to_name: "To Name",
    subject: "Hello from Squad!",
    text: 'Hello! This is a test email.',
    tags: ['example', 'hello']
  }
);
```

### Parameters
#### Required
`from_email` (string) - The email address you want listed as 'from'. For this to work, you need to [setup a sending domain](https://mandrill.zendesk.com/hc/en-us/articles/205582387-How-to-Set-up-Sending-Domains) on Mandrill.  
`from_name` (string) - Your name or your company's name.  
`to_email` (string) - The email address of your user.  
`to_name` (string) - The name of your user.  
`subject` (string) - The email subject  
`text` (string) - Tags for filtering sent emails within Mandrill

#### Optional
`reply_to` (string) - If you want users to reply to a different email address than what is listed as the "from" address.  
`html` (string) - HTML for a rich email
 
## Examples
To run the example, open your terminal, `cd` into the `examples` folder and run `node  -e "require('./sendEmail').sendExampleEmail(MANDRILL_API_KEY)"` where "MANDRILL_API_KEY" is your own test api key from Mandrill.

## Running Tests

To run the jest tests, you need to add an environment variable named `mandrillAPIKey` with your own test key from Mandrill.