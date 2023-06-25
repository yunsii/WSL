import { $, fs } from "zx";

const sourcesListPath = "/etc/apt/sources.list";
const sourcesListBakPath = "/etc/apt/sources.list.bak";

export async function updateSourcesList() {
  if (fs.existsSync(sourcesListBakPath)) {
    console.log(`${sourcesListBakPath} already backed up`);
  } else {
    await $`sudo cp ${sourcesListPath} ${sourcesListBakPath}`;
    await $`sudo cp -fR "${process.cwd()}/configs/sources.list" /etc/apt`;
    await $`sudo apt-get --yes update`;
  }
}
