@echo off

start /b .\commands\install_in_node.cmd &
@REM start /b .\commands\startServer.cmd &
cd <<Path to the directory from which to run the Node-RED server>>
cmd /C node-red