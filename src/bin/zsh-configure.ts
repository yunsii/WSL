import {
  installThemeSpaceship,
  installAndConfigurePluginZshAutosuggestions,
  installAndConfigurePluginZshSyntaxHighlighting,
  configureThemeSpaceship,
} from "../helpers/zsh.js";

// 当前需要 zsh 专属的环境变量，所以需要重启终端后配置 ZSH
// TODO 个性化配置应该不用依赖，可优化

await installThemeSpaceship();
await configureThemeSpaceship();
await installAndConfigurePluginZshAutosuggestions();
await installAndConfigurePluginZshSyntaxHighlighting();
