---
title: "Hexo+Github+Netlify博客搭建"
date: 2026-07-31T18:00:00.000+08:00
categories: 
  - 教程
  - hexo
---

## 准备工作

1. 安装 Node.js

   访问 [Node.js 官网](nodejs.org)，下载标注有 **LTS（长期支持版）** 的安装包，全程默认

2. 安装 Git

   访问 [Git 官网](git-scm.com)，下载安装包，全程默认

3. 验证

   桌面右键选择 **Open Git Bash here**，分别输入 `node -v` 和 `git --version` 并回车，如果输出具体的版本号，说明环境搭建成功
   
## 本地配置


### 初始化 Hexo

在非系统盘（如 D 盘）新建一个 Blog 文件夹并打开，右键选择 **Open Git Bash here** ，依次输入以下命令：

`npm install -g hexo-cli`

`hexo init .`

`npm install`

### 安装 Butterfly 主题

1. 将 Butterfly 主题拉取到本地：

   `npm i hexo-theme-butterfly`

2. 安装 Pug 与 Stylus 插件：

   `npm install hexo-renderer-pug hexo-renderer-stylus --save`

3. 指定博客加载主题：

   在 Blog 下，找到 _config.yml 并打开，找到 `theme:` 这行，将其修改为 `theme: butterfly` 并保存

### 配置网站外观

在 Blog 下，新建一个 _config.butterfly.yml 并打开，[基础代码文件](https://github.com/KTEC1200/KTEC/blob/main) 供参考，看不懂的可以直接发给AI，刚开始不需要照搬，把基础功能搭建好就可以了，其他的什么配置啊自己琢磨去吧

保存后切换回 Git Bash 窗口，输入 `hexo clean && hexo g && hexo s`，窗口底部弹出绿色信息 `Hexo is running at http://localhost:4000/`，在浏览器中访问 http://localhost: 4000/，就会看到刚刚创建的博客

想在博客里面添加标签、分类等，确保在 source 里有对应文件夹和 index.md 

若过程中出现类似 `npm warn allow-scripts` 的输出 ，在 Git Bash 窗口输入 `npm approve-scripts --allow-scripts-pending` 

### 配置网站信息

在 Blog 下，找到 _config.yml 并打开，[基础代码文件](https://github.com/KTEC1200/KTEC/blob/main) 供参考

保存后切换回 Git Bash 窗口，输入 `hexo clean && hexo g && hexo s`，在浏览器中访问 `http://localhost: 4000/`

### 搭建 Decap CMS 后台

在 Blog/source 下，新建一个 admin 文件夹并打开，新建一个 index.html ，并将官方调用代码复制进去并保存：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>博客管理后台</title>
  <!-- 必须在这里也引入一次鉴权脚本 -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

同目录再新建一个 config.yml，填入基础映射逻辑并保存：

```html
backend:
  name: git-gateway
  branch: main # 保持与你 GitHub 仓库的主分支名称一致

media_folder: "source/images" 
public_folder: "/images"      
# ... (下方的 collections 等其他内容保持不变) ...

collections:
  - name: "post"
    label: "文章发布"
    folder: "source/_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields: # 这里定义了你在后台编辑时能看到的输入框
      - {label: "文章标题", name: "title", widget: "string"}
      - {label: "发布时间", name: "date", widget: "datetime"}
      - {label: "正文内容", name: "body", widget: "markdown"}
      
# 跳过指定文件的渲染，匹配到的文件将会被直接复制到 public 目录
skip_render: "admin/**"
```

## 推送到 GitHub

1. 建立云端仓库：

   在 GitHub 网页端，点击右上角的 + 号，选择 **New repository**，为仓库命名，可见性选择 **Public**，不要勾选 Add a README file 等任何初始化选项，直接点击 **Create** 

2. 生成个人令牌：

   在 GitHub 网页端，点击右上角头像，选择 **Settings** ，在左侧菜单点击 **Developer settings** ，选择 **Personal access tokens/Tokens (classic)**，点击右上角的 **Generate new token (classic)** 

   在配置页面中，Note：随意填写；Expiration：下拉选择 **No expiration**；Select scopes：在下方的权限复选框中，仅勾选 **repo** ，然后滚动到最底部，点击 **Generate token**，此时屏幕上会出现一串以 `ghp_` 开头的乱码字符（也就是你的 Token），请将其复制并保存下来

3. 本地环境封装：

   在 Blog 下，右键打开 Git Bash 窗口，依次输入以下命令：

   `git remote set-url origin https://你的Token@github.com/GitHub名/仓库名.git`

   `git init` 

   `git add .`

    `git commit -m " "`

4. 建立连接并推送：

   回到刚刚创建好的 GitHub 仓库页面，找到标有 `…or push an existing repository from the command line` 的代码块，复制那里的三行命令粘贴到 Git Bash 窗口中执行

5. 之后的代码推送（如果你改动本地文件的话）：

   `git add .`
   `git commit -m " "`
   `git push`

## 推送到 Netlify

### 首次推送

访问 [Netlify 官网](https://www.netlify.com/)，选择 GitHub 进行一键授权登录，进入控制台面板后，点击 **Add new project** ，点击它正下方的 **GitHub** ，授权 Netlify 访问你的仓库列表，随后选中你的仓库

进入配置界面后，核对以下两项参数：

**Build command**： `hexo generate`

**Publish directory**： `public`

然后点击底部的 **Deploy site** ，等待约两分钟，当日志输出完毕，页面上方会生成一个以 `.netlify.app` 结尾的链接

### 相关配置

1. 开启身份认证：

   在 Netlify 控制台，点击 **Site configuration**，在左侧菜单栏中找到 Identity，点击 **Enable Identity** 

2. 配置注册权限：

   在开启 Identity 后的设置面板中，找到 **Registration preferences**，确保其状态为 **Open** ，在稍后注册完主账号后，**将其改回 Invite only** 

3. 打通写入网关：

   在左侧菜单进入 **Identity** 下属的 **Services**，找到 Git Gateway ，点击 **Enable Git Gateway**

4. 访问 admin：

   在浏览器中访问 `你的公网链接/admin`（如 `https://xxx.netlify.app/admin`），你就能看到一个独立的图形化登录界面

   如果没有弹出登录框，或者重新 `git push` 提示 `Recv failure: Connection was reset`，请按以下方法解决：

   - 在 Git Bash 窗口中执行 `ssh-keygen -t ed25519 -C "你的GitHub邮箱"`，然后 **连续按 3 次回车键**

   - 密钥生成后，执行 `cat ~/.ssh/id_ed25519.pub` 显示密钥，复制输出的这一长串密钥（以 `ssh-ed25519` 开头，以你的邮箱结尾）

   - 在 GitHub 网页端，点击右上角头像，选择 **Settings** ，在左侧菜单点击 **SSH and GPG keys**，点击 **New SSH key**，Title 随便填，Key type 保持默认，将刚才复制的密钥直接粘贴到下方的 Key 输入框中，点击 **Add SSH key** 

   - 回到 Git Bash 窗口，执行 `git remote set-url origin git@github.com:Github名/仓库名.git`
   
   然后就可以 `git push` 重新推送了

## 博客书写

**source/_posts** 里的 `.md` 最顶部的 `---` 包围区域叫 Front-matter，决定文章展示

```html
---
title:                       # 标题（必填）
date:                        # 发布时间（CMS自动生成）
tags:                        # 标签（数组形式）
  - Hexo博客
  - 教程
categories:                  # 分类（注意：层级用 [父, 子] 表示）
  - [技术, 前端]
sticky:                      # 数字越大，置顶越靠前（不写则普通排序）
cover: /images/cover.jpg     # 文章封面图路径
description:                 # 搜索引擎和首页显示的文字
---
```

其余书写参考 [markdown 教程](https://www.bilibili.com/video/BV1d741147k2/?share_source=copy_web&vd_source=23bae3b73bc623c27e59350e7f3ac30b)
