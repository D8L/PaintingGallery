# PaintingGallery 🎨

An app to track, upload, search, and export your favorite paintings to simulate a personal art gallery — using WikiArt's API and the MERN stack.

## Getting Started

Follow these steps to set up the project on your local machine using Docker:

1. Clone the repository:

```bash
git clone https://github.com/D8L/PaintingGallery.git
```

2. Navigate to the project directory:

```bash
cd PaintingGallery
```

3. Create `.env` files in the root and client directories — add the following variables to each respective file:

For the client (`client/.env`):

```env
REACT_APP_SERVER_LINK=http://localhost:<server_port>
REACT_APP_HOST_LINK=http://localhost:<client_port>
```

For the server (`.env` in the root directory):

```env
SERVER_PORT=<server_port>
DB_LINK=<your_mongodb_connection_string>
API_ACCESS_KEY=<painting_tracker_api_access_key>
API_SECRET_KEY=<painting_tracker_api_secret_key>
```

To obtain your API access key and secret key, you'll need to sign up for an account on WikiArt and request API access. You can do this [here](https://www.wikiart.org/en/App/GetApi). Follow the instructions on the WikiArt API page to get your access and secret keys.

4. Append the server port in the `package.json` of your frontend directory:

In `client/package.json`:

```
"proxy:" "http://localhost:<server_port>"
```

5. Ensure you have Docker and Docker Compose installed. If not, you can install them from the [Docker website](https://www.docker.com/get-started).

6. Build and start the Docker containers:

```bash
docker-compose up --build
```

This command will build and start the Docker containers for both the client and server.

7. Access the application:

- The frontend will be running at `http://localhost:<client_port>`
- The backend will be running at `http://localhost:<server_port>`

## Built With

* MongoDB
* Express
* React
* NodeJS
* Tailwind
* Docker

## Authors

* D8L

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/D8L/PaintingGallery/blob/main/LICENSE.md) file for details

---

### Additional Notes

- Ensure Docker and Docker Compose are installed on your machine.
- If there are any issues with ports already being used, adjust the port numbers in the `.env` files and the `docker-compose.yml` file accordingly.
- MongoDB will be automatically set up as part of the Docker Compose configuration. If you need to use an existing MongoDB instance, update the `DB_LINK` in the `.env` file accordingly.
