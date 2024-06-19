from flask import Flask, request, jsonify, send_from_directory
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)

# Load your model
model = tf.keras.models.load_model('Potatodisease.h5')

class_names = ['Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight']  # Replace with your actual class names

def preprocess_image(image):
    img = Image.open(io.BytesIO(image)).resize((256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch
    return img_array

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    image_data = base64.b64decode(data['image'])
    img_array = preprocess_image(image_data)

    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return jsonify({
        'predicted_class': predicted_class,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(debug=True)
