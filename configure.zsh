#! /bin/zsh

cd "$HOME/.wslboot" || exit

# zsh 下重装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source "$HOME/.zshrc"

nr wsl:configure
nr vim:configure
nr git:configure
nr zsh:configure

# 不生效，需要用户手动执行生效
# source "$HOME/.zshrc"

echo "恭喜~ WSL 配置初始化已完成"
