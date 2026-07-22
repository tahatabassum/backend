# 5. Image Upload Project (MongoDB & ImageKit.io Integration)

Welcome to the **Image Upload Project**! This project demonstrates how to handle file uploads in a Node.js/Express backend using **Multer**, upload images to **ImageKit.io** cloud storage, and store post metadata (image URLs and captions) in a **MongoDB** database.

---

## 📌 Project Overview
This module demonstrates:
- **File Parsing**: Handling multi-part form data containing files using `multer` memory storage.
- **Cloud Storage**: Authenticating and uploading media files directly to ImageKit.io using the official Node SDK.
- **Database Storage**: Saving the resulting Cloud Image URL along with a caption into a MongoDB collection.

---

## 📁 Directory Structure
```
5_image_upload_project/
├── src/
│   ├── db/
│   │   └── db.js             # MongoDB connection configuration
│   ├── models/
│   │   └── post.models.js    # Post Schema & Model definition
│   ├── services/
│   │   └── storage.service.js# ImageKit configuration & file upload utility
│   └── app.js                # Express routing & file upload controllers
├── .env                      # Database & ImageKit credentials (git ignored)
├── package.json              # Project dependencies & scripts
├── package-lock.json         # Dependency tree lockfile
├── server.js                 # Server entry point (starts listener & connects DB)
├── README.md                 # Project guide
└── Explanation.md            # Detailed code walkthrough
```

---

## 🚀 API Endpoints

| Method | Endpoint | Content-Type | Request Body (Form-Data) | Status Codes |
|---|---|---|---|---|
| `POST` | `/create-post` | `multipart/form-data` | `image` (File), `caption` (Text) | `201 Created`, `400 Bad Request`, `500 Server Error` |
| `GET` | `/posts` | `application/json` | None | `200 OK`, `500 Server Error` |

---

## ⚡ How to Run

1. Navigate to this directory:
   ```bash
   cd 5_image_upload_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root of this folder and fill in your credentials from the MongoDB Atlas and ImageKit.io developer dashboard:
   ```env
   MONGO_LINK=mongodb+srv://<username>:<password>@cluster1.fpuvagz.mongodb.net/image?retryWrites=true&w=majority
   IMAGEKIT_PRIVATE_KEY=private_your_private_key
   IMAGEKIT_PUBLIC_KEY=public_your_public_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/
   ```

4. Run the server:
   ```bash
   npx nodemon server.js
   ```

5. Test the `/create-post` endpoint using Postman or Thunder Client by choosing `Form-Data` request type, selecting `File` type for the `image` key, adding a text value for `caption`, and clicking Send!
