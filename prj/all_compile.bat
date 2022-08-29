@setlocal
@set SCRIPTDIR=%~dp0
@cd %SCRIPTDIR%
@set CMD_CMPILE=%SCRIPTDIR%\compile.bat

cmd /C create_config.bat

@cd %SCRIPTDIR%
cd main
cmd /C %CMD_CMPILE% mainHellowFileRead.ts
move mainHellowFileRead.exe   ..\..\

@cd %SCRIPTDIR%
cd webview
cmd /C %CMD_CMPILE% exampleWebView.ts
move exampleWebView.exe   ..\..\
copy index.html           ..\..\

@endlocal
