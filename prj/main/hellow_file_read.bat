@setlocal
@set SCRIPTDIR=%~dp0

@rem cmd /C ..\create_config.bat

set IMPORT_MAP_PATH=%SCRIPTDIR%\import_map_tmp.json
set TS_SRC_PATH=%SCRIPTDIR%\\mainHellowFileRead.ts

deno run --reload=https://deno.land/std --allow-all --unstable --import-map %IMPORT_MAP_PATH% %TS_SRC_PATH% %*

@endlocal
