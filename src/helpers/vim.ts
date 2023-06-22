import { $ } from "zx";

export async function configureVim() {
  await $`sudo cp -fR "${process.cwd()}/configs/vimrc" ${
    process.env.HOME
  }/.vim`;
}
