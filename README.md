# PaintingTracker 🎨

An app to track, upload, search, and export your favorite paintings to simulate a personal art gallery — using WikiArt's API and built on the MERN stack

## Getting Started

Follow these steps to set up the project on your local machine:

1. Clone the repository:

```
git clone https://github.com/D8L/PaintingTracker.git
```

2. Navigate to the project directory:

```
cd PaintingTracker
```

3. Install dependencies for both the frontend and backend:

```
cd client
npm install
cd ../server
npm install
```

4. Create `.env` files in the frontend and backend directory — add the following variables to each respective file:

```
REACT_APP_SERVER_LINK = <http://localhost:server_port>
REACT_APP_HOST_LINK = <http://localhost:client_port>
```
```
SERVER_PORT = <server_port>
DB_LINK = <your_mongodb_connection_string>
API_ACCESS_KEY = <painting_tracker_api_access_key>
API_SECRET_KEY = <<painting_tracker_api_secret_key>
```

5. Append the server port in package.json of your frontend directory:
   
```
"proxy": "http://localhost:<server_port>"
```

6. Start the frontend and backend servers in separate terminal windows:

```
# In the frontend directory
npm start

# In the backend directory
npm start
```

## Built With

* MongoDB
* Express
* React
* NodeJS

## Authors

* D8L

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/D8L/PaintingTracker/blob/main/LICENSE.md) file for details
