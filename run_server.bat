@echo off
echo Installing required packages...
pip install -r requirements.txt

echo Starting Flask server...
python server.py

pause
