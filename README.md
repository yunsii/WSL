# WSL

我的 Windows 开发环境搭建脚本

> [视频演示](https://www.bilibili.com/video/BV1Fu411h7kD)

## TODOs

- [ ] Windows 分享文件
- [ ] WSL SSH 服务器 / Windows 端口转发

## 使用方式

### Windows 11

当前仅在 Windows 11 上测试，有问题欢迎反馈。

#### PowerShell 安装 Ubuntu 2204

```ps1
Invoke-WebRequest https://raw.githubusercontent.com/yunsii/WSL/master/ms/win11/install-ubuntu2204.ps1 -OutFile install-ubuntu2204.ps1
.\install-ubuntu2204.ps1
Remove-Item -Path install-ubuntu2204.ps1
```

安装成功后会自动进入 WSL，需要先配置用户，配置后即可[初始化 WSL](#初始化-wsl)，可执行 `exit` 命令退出 WSL 环境，此时 PowerShell 终端会有一个删除安装脚本的命令，回车删除即可。

#### PowerShell 迁移 Ubuntu 2204

```ps1
Invoke-WebRequest https://raw.githubusercontent.com/yunsii/WSL/master/ms/win11/migrate-ubuntu2204.ps1 -OutFile migrate-ubuntu2204.ps1
.\migrate-ubuntu2204.ps1 -NewDir D:\wsl\instances -TarDir D:\wsl\tars
Remove-Item -Path migrate-ubuntu2204.ps1
```

当 WSL 配置完成后，可考虑迁移到其他盘，默认安装在 Windows 系统盘长久下去合适。

### WSL

#### 初始化 WSL

```shell
curl -o- https://raw.githubusercontent.com/yunsii/WSL/master/install.sh | bash
```

初始化完成后需要重启终端以使 zsh 做为默认终端启动，注入配置 zsh 需要的相关环境变量，重启后调用[配置 WSL](#配置-wsl) 的脚本即可完成对于 WSL 各项功能的基本定制。

#### 配置 WSL

```shell
$HOME/.wslboot/configure.zsh
```

脚本正常完成后重启终端生效，或者手动执行 `source "$HOME/.zshrc"` 即可生效。配置完成后即可删除该代码仓库

```shell
rm -fr $HOME/.wslboot
```

## 相关链接

- [我的 Windows 开发环境搭建手册](https://juejin.cn/post/7079329668028956709)
- [WSL 2 开发环境脚本搭建演示](https://www.bilibili.com/video/BV1Fu411h7kD)
