# Project Setup Instructions

Please follow the steps below to set up and run the project on your local machine.

---

## 1. Create a `.env` File

Create a file named `.env` in the root directory of the project, and add the following environment variables:

```env
NEXTAUTH_SECRET=<HASH_VALUE>
NEXTAUTH_URL="http://localhost:3000"
```

> ⚠️ **Note:**
>
> * Replace `<HASH_VALUE>` with your actual secret key.
> * Ensure the URL does **not** have a trailing slash.

---

## 2. Build the Project

Once the `.env` file is set up, run the following command to build the project:

```bash
npm run build
```

---

## 3. Start the Server

After building the project, start the server with:

```bash
npm start
```

> This will start the application on `http://localhost:3000`.
