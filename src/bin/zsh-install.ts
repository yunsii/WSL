import { installOnMyZsh, installZsh } from "../helpers/zsh.js";

await installZsh();
await installOnMyZsh();
console.log(`重新登录将 zsh 做为默认终端启动`);
