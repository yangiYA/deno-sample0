#!/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd ${SCRIPT_DIR}

func_compile() {
  deno compile --reload=https://deno.land/std --allow-all --unstable --import-map ./import_map_tmp.json $*
}

sh create_config.sh

cd ${SCRIPT_DIR}
cd main
func_compile mainHellowFileRead.ts
mv           mainHellowFileRead   ..\..\

cd ${SCRIPT_DIR}
cd webview
func_compile exampleWebView.ts
mv           exampleWebView       ..\..\
cp           index.html           ..\..\
