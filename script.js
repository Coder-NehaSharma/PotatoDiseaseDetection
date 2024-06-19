// function predict() {
//     const fileInput = document.getElementById('imageUpload');
//     if (fileInput.files.length === 0) {
//         alert('Please upload an image first.');
//         return;
//     }

//     const imageFile = fileInput.files[0];
//     const reader = new FileReader();
    
//     reader.onload = function(event) {
//         const image = new Image();
//         image.src = event.target.result;
//         image.onload = function() {
//             // Here you can add your prediction logic
//             // For now, we'll just show a placeholder result

//             const detectedResult = document.getElementById('detectedResult');
//             const precautionResult = document.getElementById('precautionResult');

//             detectedResult.innerHTML = 'Predicted disease: <b>Early Blight</b>';
//             precautionResult.innerHTML = 'Suggested precaution: <b>Use appropriate fungicides</b>';
//         }
//     }

//     reader.readAsDataURL(imageFile);
// }
function predict() {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    const imageFile = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;
        image.onload = function() {
            // Placeholder prediction logic
            // Replace this section with the actual model prediction logic

            const detectedResult = document.getElementById('detectedResult');
            const precautionResult = document.getElementById('precautionResult');

            // Example: Assuming we have a function `modelPredict` that returns the prediction
            const prediction = modelPredict(image);  // This should be replaced with actual prediction logic

            let detectedDisease = '';
            let precautionMessage = '';

            if (prediction === 'early_blight') {
                detectedDisease = 'Early Blight';
                precautionMessage = 'Use appropriate fungicides';
            } else if (prediction === 'late_blight') {
                detectedDisease = 'Late Blight';
                precautionMessage = 'Use resistant varieties and ensure proper drainage';
            } else if (prediction === 'healthy') {
                detectedDisease = 'Healthy';
                precautionMessage = 'Take care of your crop';
            } else {
                detectedDisease = 'Unknown';
                precautionMessage = 'No precaution available';
            }

            detectedResult.innerHTML = `Predicted disease: <b>${detectedDisease}</b>`;
            precautionResult.innerHTML = `Suggested precaution: <b>${precautionMessage}</b>`;
        }
    }

    reader.readAsDataURL(imageFile);
}

// Placeholder function for model prediction
// Replace this with the actual model prediction function
function modelPredict(image) {
    // Example placeholder logic
    // Implement actual model prediction logic here
    const possiblePredictions = ['early_blight', 'late_blight', 'healthy'];
    return possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)];
}
