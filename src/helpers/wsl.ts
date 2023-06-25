import { $, fs } from "zx";
import ini from "ini";

export interface IConfigureWslConfOptions {
  defaultUser: string;
}

// wsl.conf ref: https://learn.microsoft.com/en-us/windows/wsl/wsl-config#configuration-settings-for-wslconf
export async function configureWslConf(options: IConfigureWslConfOptions) {
  const configStr = fs.readFileSync(`/etc/wsl.conf`, { encoding: "utf-8" });
  const config = ini.parse(configStr);

  if (config.user.default) {
    // 如果有默认用户了不做任何操作
    return;
  }

  config.user = {
    default: options.defaultUser,
  };

  await $`echo ${ini.stringify(config)} | sudo tee /etc/wsl.conf`;
}
