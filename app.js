// Class names for prediction (matching server-side)
const classNames = [
    'Aloevera', 'Amla', 'Amruthaballi', 'Arali', 'Astma_weed', 'Badipala', 'Balloon_Vine', 'Bamboo', 'Beans', 'Betel',
    'Bhrami', 'Bringaraja', 'Caricature', 'Castor', 'Catharanthus', 'Chakte', 'Chilly', 'Citron lime (herelikai)',
    'Coffee', 'Common rue(naagdalli)', 'Coriender', 'Curry', 'Doddpathre', 'Drumstick', 'Ekka', 'Eucalyptus', 'Ganigale',
    'Ganike', 'Gasagase', 'Ginger', 'Globe Amarnath', 'Guava', 'Henna', 'Hibiscus', 'Honge', 'Insulin', 'Jackfruit',
    'Jasmine', 'Kambajala', 'Kasambruga', 'Kohlrabi', 'Lantana', 'Lemon', 'Lemongrass', 'Malabar_Nut', 'Malabar_Spinach',
    'Mango', 'Marigold', 'Mint', 'Neem', 'Nelavembu', 'Nerale', 'Nooni', 'Onion', 'Padri', 'Palak(Spinach)', 'Papaya',
    'Parijatha', 'Pea', 'Pepper', 'Pomoegranate', 'Pumpkin', 'Raddish', 'Rose', 'Sampige', 'Sapota', 'Seethaashoka',
    'Seethapala', 'Spinach1', 'Tamarind', 'Taro', 'Tecoma', 'Thumbe', 'Tomato', 'Tulsi', 'Turmeric', 'ashoka', 'camphor',
    'kamakasturi', 'kepala'
];

// DOM elements
const imageUpload = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const imagePreview = document.getElementById('imagePreview');
const predictionText = document.getElementById('predictionText');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceText = document.getElementById('confidenceText');

// Initialize the application
function initApp() {
    predictionText.textContent = 'Ready! Upload an image to identify the plant';
    console.log('Application initialized');
}

// Handle image upload
imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        imagePreview.style.display = 'block';
        
        // Reset previous results
        predictionText.textContent = 'Analyzing image...';
        confidenceText.textContent = '';
        confidenceBar.style.width = '0%';
        
        // Send to server for prediction
        sendImageToServer(file);
    };
    reader.readAsDataURL(file);
});

// Send image to Flask server for prediction
async function sendImageToServer(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        // Update UI with prediction results
        const accuracy = result.accuracy;
        predictionText.textContent = `Predicted: ${result.class}`;
        confidenceText.textContent = `Accuracy: ${accuracy}%`;
        confidenceBar.style.width = `${accuracy}%`;
        
    } catch (error) {
        console.error('Prediction error:', error);
        predictionText.textContent = 'Error processing the image. Please try again.';
        confidenceText.textContent = '';
        confidenceBar.style.width = '0%';
    }
}



// Initialize the app
initApp();
