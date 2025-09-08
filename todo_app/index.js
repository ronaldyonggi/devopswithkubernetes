const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const IMAGE_URL = "https://picsum.photos/1200";

const CACHE_DIR = "/usr/src/app/files";
const IMAGE_PATH = path.join(CACHE_DIR, "image.jpg");
const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

// Ensure the cache directory exists when the app starts
fs.mkdirSync(CACHE_DIR, { recursive: true });

// Tell express to serve static files from 'public' directory
app.use(express.static("public"));

// Serves the cached image data
app.get("/image", async (req, res) => {
  try {
    let imageBuffer;
    let needsFetching = true; // Flag to check if the image needs to be fetched

    // Check if an image already exists and it's already 10 minutes
    if (fs.existsSync(IMAGE_PATH)) {
      const stats = fs.statSync(IMAGE_PATH);
      const fileAge = new Date() - stats.mtime;

      if (fileAge < TEN_MINUTES_IN_MS) {
        needsFetching = false;
      }
    }

    // If new image needs to be fetched
    if (needsFetching) {
      console.log("Fetching a new image...");
      const response = await fetch(IMAGE_URL);
      // Get image data as an ArrayBuffer
      const imageArrayBuffer = await response.arrayBuffer();
      // Convert the buffer to Node.js buffer, which Express can send
      imageBuffer = Buffer.from(imageArrayBuffer);
      // Save the image to the cache
      fs.writeFileSync(IMAGE_PATH, imageBuffer);
    } else {
      // If no need to fetch new image
      // Read the image from the cache
      imageBuffer = fs.readFileSync(IMAGE_PATH);
    }

    // Set the correct content type so browser knows it's an image
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Failed to fetch image:", error);
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
