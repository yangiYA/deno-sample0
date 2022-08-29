@setlocal
@set SCRIPTDIR=%~dp0
@cd %SCRIPTDIR%

deno run --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map.json ./createConfig.ts %SCRIPTDIR%
@endlocal
