// Array of image URLs
const imageUrls = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

// Function to download an image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };
  });
}

// Main function to download all images
function downloadImages() {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  // Show loading spinner
  loadingDiv.style.display = "block";

  // Clear any previous error messages
  errorDiv.style.display = "none";
  errorDiv.textContent = "";

  // Clear any previous images
  outputDiv.innerHTML = "";

  // Create an array of promises for downloading images
  const downloadPromises = imageUrls.map((url) => downloadImage(url));

  // Use Promise.all to handle all downloads
  Promise.all(downloadPromises)
    .then((images) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Append each image to the output div
      images.forEach((img) => {
        outputDiv.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display error message
      errorDiv.style.display = "block";
      errorDiv.textContent = error;
    });
}

// Call the main function to start downloading images
downloadImages();