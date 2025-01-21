@echo off

echo Installing system-node for Node-RED
cd <<Path to your ".node-red" folder>>
cmd /C npm uninstall Node-RED-System-Node
cmd /C npm install <<Path to your copy of this repository>>