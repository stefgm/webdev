@echo off
mkdir "public\mountain-chalet"
xcopy "C:\mountain-chalet\*" "public\mountain-chalet\" /E /I /H
echo Files copied successfully!
