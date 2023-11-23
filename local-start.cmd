@echo off

:: Change to the directory where the script is located
cd %~dp0

:: Configure the oracle instant client env variable
set PATH=%PATH%;"C:\Users\Owner\OneDrive - UBC\Years\Year 4\Term 1\CPSC 304\instantclient-basiclite-windows.x64-19.20.0.0.0dbru"

:: Start Node application
node server.js

exit /b 0
