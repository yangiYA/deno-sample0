deno-sample0
--------------

deno cui and webview sample project

- - - - - - - - - - - - - - - - - - 

Scoop をインストール
---------------------

*   [Scoop公式](https://scoop.sh/)  

PowerShell terminal を開いて以下を実行

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

*   確認  
    `%USERPROFILE%\scoop` に scoop 関連ファイルが作成される。 (gitbash の場合は `~/scoop` )

deno 最新をインストール
-------------------------------

コマンドプロンプトで 以下を実行

```
scoop install deno
```

※ deno 最新化

```
scoop update deno
```
