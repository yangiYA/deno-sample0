@setlocal
@set SCRIPTDIR=%~dp0
@cd %SCRIPTDIR%

set LOG_LEVEL=--log-level=info
@rem set LOG_LEVEL=--log-level debug

@rem echo ���݂̃f�B���N�g�� : %echo%
@set nowpath=%cd%
@echo ���݂̃f�B���N�g�� : %nowpath%

deno  %LOG_LEVEL% test --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map.json %*
@rem deno  %LOG_LEVEL% test                                --allow-all --unstable --import-map ./import_map.json %*

@rem *** ���ʂ�CSV�`���ɂ���c�[�� https://code4fukui.github.io/deno-test-helper/test2csv.js ***
@rem deno test --allow-all --unstable --import-map ./import_map.json test/%* | deno run https://code4fukui.github.io/deno-test-helper/test2csv.js
@endlocal
