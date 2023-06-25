import { $, fs } from "zx";

export async function configureVim() {
  const vimConfigDir = `${process.env.HOME}/.vim`;

  fs.ensureDirSync(vimConfigDir);
  await $`cp -fR "${process.cwd()}/configs/vimrc" ${vimConfigDir}`;
}
