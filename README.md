# Nest.js Email JSON Extractor

This repository is home to a Nest.js project designed to exhibit the functionality of extracting JSON data from various sources within an email. The core mechanism is built around the `mail-parser` library, which is harnessed to parse the content of email files.

## Features

The project establishes a controller with a dedicated endpoint that accepts the URL or the path of an email file as a parameter. This endpoint is crafted to respond with the JSON data extracted from the email in the following scenarios:

1. **JSON File Attachment**: When the email houses a JSON file as an attachment, the endpoint will extract and respond with the JSON data from the attachment.

2. **JSON Link in Email Body**: Should the email body encase a direct link to a JSON file, the endpoint will pursue the link, retrieve the JSON file, and respond with the JSON data.

3. **Webpage Link in Email Body**: If the email body embeds a link to a webpage, and that webpage in turn encompasses a link to a JSON file, the endpoint will trail the link to the webpage, extract the link to the JSON file, retrieve the JSON file, and respond with the JSON data.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/josueg15/nestjs-email-json-extractor.git
   cd nestjs-email-json-extractor
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Project**:
   ```bash
   npm run start
   ```

Now, the server will be running, and you can send HTTP requests to the endpoint to test the JSON extraction functionality.

## Testing

This project employs a Test-Driven Development (TDD) approach. You can run the test suite using the following command:

```bash
npm run test
```

## Contributing

Feel free to fork the repository, create a feature branch, and open a Pull Request if you have enhancements or bug fixes you'd like to contribute.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
