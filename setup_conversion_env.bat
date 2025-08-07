@echo off
REM Create a virtual environment
python -m venv tfjs_conversion_env

REM Activate the virtual environment
call tfjs_conversion_env\Scripts\activate

REM Install specific versions of packages that work well together
pip install tensorflow==2.12.0
pip install tensorflowjs==4.8.0
pip install numpy==1.23.5

echo Environment setup complete. Run 'convert_model.py' while the virtual environment is active.
