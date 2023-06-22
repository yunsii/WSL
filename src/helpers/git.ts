import { $ } from "zx";

export async function useCodeEditor() {
  // why `code --wait`, ref: https://stackoverflow.com/a/68975403/8335317
  await $`git config --global core.editor "code --wait"`;
}

export async function clone(owner: string, repo: string, target?: string) {
  try {
    await $`git clone https://github.com/${owner}/${repo}.git ${target} --depth=1`;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
    // 失败后尝试使用代理
    await $`git clone https://hub.fastgit.org/${owner}/${repo}.git ${target} --depth=1`;
  }
}
