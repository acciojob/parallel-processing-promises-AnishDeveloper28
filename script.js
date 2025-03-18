const imageUrls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
    });
}

function downloadImages() {
    const outputDiv = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loadingDiv = document.getElementById("loading");
    
    // Show loading spinner
    loadingDiv.style.display = "block";
    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";
    
    Promise.all(imageUrls.map(downloadImage))
        .then(images => {
            // Hide loading spinner
            loadingDiv.style.display = "none";
            
            // Append images to output div
            images.forEach(img => outputDiv.appendChild(img));
        })
        .catch(error => {
            // Hide loading spinner
            loadingDiv.style.display = "none";
            
            // Show error message
            errorDiv.textContent = error;
        });
}

document.getElementById("btn").addEventListener("click", downloadImages);
