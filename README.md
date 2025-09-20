# Project Setup Instructions

Please follow the steps below to set up and run the project on your local machine.

---

1. **Create a `.env` File**

Create a file named `.env` in the root directory of the project and add the following environment variables:

```
NEXTAUTH_SECRET=<HASH_VALUE>
NEXTAUTH_URL="http://localhost:3000"
```

Note:

* Replace `<HASH_VALUE>` with your actual secret key.
* Make sure the URL does **not** have a trailing slash.

---

2. **Install Dependencies**

Run the following command to install all required project dependencies:

```
npm install
```

---

3. **Build the Project**

After installing the dependencies, build the project using:

```
npm run build
```

---

4. **Start the Server**

Once the build is complete, start the server with:

```
npm start
```

This will launch the application at: [http://localhost:3000](http://localhost:3000)
