#!/bin/sh
SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR

echo 実行ディレクトリ: 
pwd
echo .

# deno test --allow-all                  --unstable --import-map ./import_map.json $@
deno test --log-level=info --allow-all --unstable --import-map ./import_map.json $@
