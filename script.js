// Array of image URLs
const imageUrls = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
    img.src = url;
  });
}

// Main function to download images
async function downloadImages(urls) {
  const loadingDiv = document.getElementById('loading');
  const outputDiv = document.getElementById('output');
  const errorDiv = document.getElementById('error');

  // Show loading spinner
  loadingDiv.style.display = 'block';
  errorDiv.innerHTML = '';
  outputDiv.innerHTML = '';

  try {
    // Download all images in parallel
    const images = await Promise.all(urls.map(downloadImage));

    // Hide loading spinner
    loadingDiv.style.display = 'none';

    // Display images
    images.forEach(img => outputDiv.appendChild(img));
  } catch (error) {
    // Hide loading spinner and display error
    loadingDiv.style.display = 'none';
    errorDiv.innerHTML = error;
  }
}

// Call the function to initiate downloads
downloadImages(imageUrls);