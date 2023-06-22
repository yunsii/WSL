import { configureWslConf } from "../helpers/wsl.js";

// 将当前用户设置为 WSL 启动的默认用户
await configureWslConf({ defaultUser: process.env.USER });
