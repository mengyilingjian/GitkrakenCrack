### 免责声明

所有内容资源均来源于网络，仅供交流学习与研究使用，版权归属原版权方所有，版权争议与本人无关，用户本人下载后不能用作商业或非法用途，否则后果均由用户承担责任; 如果您访问和下载此文件，表示您同意只将此软件用于参考、学习而非其他用途，否则一切后果请您自行承担，请于下载后24小时内删除，不允许用于商业用途，否则法律问题自行承担。 如果您喜欢该软件，请支持正版软件，购买注册，得到更好的正版服务。

---

### 准备工作

安装前请确认安装了`node`命令和`yarn`工具

yarn安装教程请参考我的csdn：

[Windows下 安装yarn，利用chocolatey软件包管理工具，比npm更快更稳定--梦逸灵箭的博客](https://blog.csdn.net/weixin_42661321/article/details/87887898)

---

### 软件安装

1. 下载最新的安装包
   
   官网下载地址：`https://release.axocdn.com/win64/GitKrakenSetup.exe
2. 安装软件
3. 打开软件后，如果你是**初次使用**该软件，会进入用户引导页面。

### 软件破解

> 此工具 `GNU/Linux` (without `snap`), `Windows`和`macOS` 全平台可用

1. 下载破解脚本，退出软件，执行以下命令
   **⚠再次提醒：破解之前先关闭 Gitkraken 软件，Mac平台确保在底部Dock栏中也彻底关闭该软件**

```
git clone https://github.com/mengyilingjian/GitkrakenCrack.git

cd GitkrakenCrack/GitkrakenCrack 
yarn install 
yarn build 
yarn gitcracken patcher
```

![执行过程.png](https://qiniu.program-er.com/blog/typecho/usr/uploads/gitkraken-pojie.png)

2. 重启gitkraken，则可以看到pro图标

![破解结果.png](https://qiniu.program-er.com/blog/typecho/usr/uploads/gitkraken-success.png)

3. 关闭自动更新，打开host文件，添加以下内容

```bash
# gitKraken 更新屏蔽 127.0.0.1 release.gitkraken.com
```

![屏蔽更新.png](https://www.program-er.com/usr/uploads/2021/05/1101707972.png)
