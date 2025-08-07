import tensorflow as tf
import tensorflowjs as tfjs

def convert_keras_to_tfjs():
    # Load the Keras model
    print("Loading Keras model...")
    model = tf.keras.models.load_model('Trained_model.keras')
    
    # Create output directory
    output_dir = './tfjs_model'
    
    print(f"Converting model to TensorFlow.js format in directory: {output_dir}")
    
    # Convert the model
    tfjs.converters.save_keras_model(model, output_dir)
    
    print("Conversion completed successfully!")

if __name__ == "__main__":
    convert_keras_to_tfjs()
