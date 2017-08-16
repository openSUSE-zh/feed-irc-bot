# feed-irc-bot

将论坛和维基的 Atom 动态转发到 IRC。

> 不论天荒与地老，我们 IRC 上见。

## 安装软件包

```
sudo zypper install cabal-install ghc

cabal update

cabal install rss2irc
```

## 启动机器人

`cabal` 安装的软件包都在 `~/.cabal` 里面。

```
~/.cabal/bin/rss2irc https://forum.suse.org.cn/feed.php suse_cn_forum@chat.freenode.net:6667/#opensuse-cn &
~/.cabal/bin/rss2irc https://zh.opensuse.org/api.php?hidebots=1&days=7&limit=50&action=feedrecentchanges&feedformat=atom suse_cn_wiki@chat.freenode.net:6667/#opensuse-cn &
```

## 联系管理员

目前是[郭云鹤](mailto:guoyunhebrave@gmail.com)在管理。
