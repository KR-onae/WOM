@echo off
chcp 65001
:start
cls
node ./codes/main.js
set /p do=Do you want to restart? 
if %do% == n (
    pause
) else (
    goto start
)