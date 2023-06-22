#! /bin/zsh

cd "$HOME/.wslboot" || exit

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source "$HOME/.zshrc"

nr wsl:configure
nr vim:configure
nr git:configure
nr zsh:configure

# 不生效，需要用户手动执行生效
# source "$HOME/.zshrc"

echo "Congratuation! WSL configuration completed."
