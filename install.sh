#! /bin/sh

set -e

# 克隆代码仓库
if [ -e "$HOME/.wslboot" ]
then
  cd "$HOME/.wslboot" || exit
  git reset --hard HEAD
  git pull
else
  git clone https://github.com/yunsii/WSL.git "$HOME/.wslboot"
  cd "$HOME/.wslboot" || exit
fi

# 安装时报类似的错时：
# Appending bash_completion source string to /home/username/.bashrc
# /usr/bin/env: ‘bash\r’: No such file or directory
# 可忽略，这是因为脚本 `NPM_VERSION="$(npm --version)"` 中的 npm 找到 Windows 系统上去了，
# 如果 Windows 上没有安装 Node.js 应该就没这个报错了
#
# 另外，如果是多用户使用时，通过 su 切换用户安装 nvm 也会报错，会读取到切换前的用户的 nvm 仓库，
# 并且由于没有权限操作仓库而失败。
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# shellcheck disable=SC1091
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 直接 source 不能让 nvm 相关配置生效
# . "$HOME/.bashrc"

nvm install 18
npm install -g pnpm
npm install -g @antfu/ni
ni
nr apt:update
nr zsh:install
