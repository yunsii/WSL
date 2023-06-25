import { $, fs } from "zx";
import { clone } from "./git.js";

export async function installZsh() {
  // ref: https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default
  await $`sudo apt-get --yes install zsh`;
  // 将 zsh 设置为默认 Shell，ref: https://askubuntu.com/a/1325754/1681418
  await $`sudo chsh -s "$(which zsh)" "$(whoami)"`;
}

export async function installOnMyZsh() {
  await $`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`;
}

export async function configureZsh() {
  await $`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`;
}

export async function getThemeDir(theme: string) {
  const result =
    await $`echo \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/${theme}`;
  return result.stdout.trim();
}

export async function getPluginDir(theme: string) {
  const result =
    await $`echo \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/${theme}`;
  return result.stdout.trim();
}

export async function installThemeSpaceship() {
  const themeName = "spaceship-prompt";
  const themeDir = await getThemeDir(themeName);
  if (fs.existsSync(themeDir)) {
    console.log(`themes/${themeName} downloaded`);
  } else {
    await clone(themeName, themeName, themeDir);
    await $`ln -s \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/${themeName}/spaceship.zsh-theme \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/spaceship.zsh-theme`;
  }
}

export async function configureThemeSpaceship() {
  // TODO: try to use mvdan-sh use update .zshrc
  const zshrc = fs.readFileSync(`${process.env.HOME}/.zshrc`, {
    encoding: "utf-8",
  });
  fs.writeFileSync(
    `${process.env.HOME}/.zshrc`,
    zshrc
      .split("\n")
      .map((item) => {
        if (item.startsWith("ZSH_THEME")) {
          // 默认禁用 SPACESHIP_PROMPT_ASYNC
          return [`ZSH_THEME="spaceship"`, "SPACESHIP_PROMPT_ASYNC=false"].join(
            "\n"
          );
        }
        return item;
      })
      .join("\n"),
    {
      encoding: "utf-8",
    }
  );
}

export async function installAndConfigurePlugin(
  pluginName: string,
  options = {
    owner: "zsh-users",
    sourcePluginName: pluginName,
  }
) {
  const pluginDir = await getPluginDir(pluginName);
  if (fs.existsSync(pluginDir)) {
    console.log(`plugins${pluginDir} downloaded`);
  } else {
    await clone(options.owner, pluginName, pluginDir);
    await $`echo "source \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/${pluginName}/${options.sourcePluginName}.zsh" >> \${ZDOTDIR:-$HOME}/.zshrc`;
  }
}

export async function installAndConfigurePluginZshAutosuggestions() {
  const pluginName = "zsh-autosuggestions";
  await installAndConfigurePlugin(pluginName);
}

export async function installAndConfigurePluginZshSyntaxHighlighting() {
  const pluginName = "zsh-syntax-highlighting";
  await installAndConfigurePlugin(pluginName);
}
