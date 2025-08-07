import tensorflow as tf
import os

def convert_keras_to_tfjs():
    # Create output directory
    output_dir = './tfjs_model'
    os.makedirs(output_dir, exist_ok=True)
    
    print("Loading Keras model...")
    # Load the Keras model
    model = tf.keras.models.load_model('Trained_model.keras')
    
    print("Converting model to TensorFlow.js format...")
    # Convert the model to TensorFlow.js format
    tf.saved_model.save(model, output_dir)
    
    print(f"Model successfully converted and saved to {output_dir}")

if __name__ == "__main__":
    convert_keras_to_tfjs()
