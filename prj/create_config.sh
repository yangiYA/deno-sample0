#!/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd ${SCRIPT_DIR}
echo 
# echo SCRIPT_DIR : ${SCRIPT_DIR}

echo "deno run --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map.json ./main/createConfig.ts ${SCRIPT_DIR}"
deno run --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map.json ./main/createConfig.ts ${SCRIPT_DIR}
