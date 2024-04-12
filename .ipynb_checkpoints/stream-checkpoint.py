import streamlit as st
from PIL import Image
import tensorflow as tf
import numpy as np

# Set page title
st.title('Deep Learning Model Image Checker')

# Load your deep learning model
@st.cache(allow_output_mutation=True)
def load_model():
    model = tf.keras.models.load_model("Potatodisease.h5")  # Replace "your_model_path.h5" with the path to your model file
    return model

model = load_model()

# Display instructions
st.write("Drag and drop an image here, or browse to upload.")

# Allow users to upload image files
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

# Function to make predictions
def make_prediction(image):
    img = Image.open(image).resize((224, 224))  # Resize the image to match your model's input size
    img_array = np.array(img) / 255.0  # Normalize the image
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    prediction = model.predict(img_array)  # Make prediction
    return prediction

# Display the uploaded image and prediction
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image.', use_column_width=True)
    
    # Make prediction when the user drops or uploads an image
    prediction = make_prediction(uploaded_file)
    
    # Display the prediction result
    st.write("Prediction:")
    st.write(prediction)
