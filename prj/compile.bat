@setlocal
@rem @set SCRIPTDIR=%~dp0
@rem @cd %SCRIPTDIR%

deno compile --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map_tmp.json %*
@endlocal
