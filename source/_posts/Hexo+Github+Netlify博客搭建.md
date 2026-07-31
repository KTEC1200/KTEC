---
"0": t
"1": i
"2": t
"3": l
"4": e
"5": ：
"6": H
"7": e
"8": x
"9": o
"10": +
"11": G
"12": i
"13": t
"14": h
"15": u
"16": b
"17": +
"18": N
"19": e
"20": t
"21": l
"22": i
"23": f
"24": y
"25": 博
"26": 客
"27": 搭
"28": 建
title: Hexo+Github+Netlify博客搭建
date: 2026-07-31T17:10:00.000+08:00
---

### 环境安装

1. 安装Node.js

   访问[Node.js官网](nodejs.org)，下载标注有 **LTS（长期支持版）** 的安装包，全程默认

2. 安装Git

   访问[Git官网](git-scm.com)，下载安装包，全程默认

3. 验证

   桌面右键选择 **Open Git Bash here**，分别输入 `node -v` 和 `git --version` 并回车，如果输出具体的版本号，说明环境搭建成功
   
### 本地配置


#### 初始化Hexo

在非系统盘（如D盘）新建一个 **Blog** 文件夹并打开，右键选择 **Open Git Bash here** ，依次输入以下命令：

`npm install -g hexo-cli`

`hexo init .`

`npm install`

#### 安装Butterfly主题

1. 将 Butterfly 主题拉取到本地：

   `npm i hexo-theme-butterfly`

2. 安装 Pug 与 Stylus 插件：

   `npm install hexo-renderer-pug hexo-renderer-stylus --save`

3. 指定博客加载主题：

   在 **Blog** 文件夹下，找到 **_config.yml** 文件并打开，找到 `theme:` 这行，将其修改为`theme: butterfly`并保存

#### 配置外观

在 **Blog** 文件夹下，新建一个 **_config.butterfly.yml** 文件并打开，我的代码供参考：

```html
# 整体布局色彩（light浅色、dark深色、auto自动）
display_mode: light

# 网站全局主题色配置
theme_color:
  enable: true
  main: "#1E90FF"           # 核心主色调
  paginator: "#00BFFF"      # 翻页与悬浮色
  button_hover: "#0073E6"   # 按钮悬浮反馈色
  text_selection: "#00BFFF" # 鼠标选中文字时的背景色
  link_color: "#1E90FF"     # 正文内超链接的默认颜色
  hr_color: "#87CEFA"       # 分割线颜色

# 网站全局背景设置，直接填写相对路径，不要加 url()！！！
background: /images/001.jpg

# 首页顶部图 (设置为 false 关闭占位，让页面更加紧凑极简)
index_img: false

# 顶部导航栏设置
nav:
  enable: true
  # 开启向下滚动时的悬浮固定效果
  fixed: true
  # 开启全局透明效果
  transparent: true

# 全站无刷新加载 (PJAX)
pjax:
  enable: true
  exclude:

# 本地搜索  
local_search:
  enable: true
  preload: false
   
# 引入 css 和 js 效果
inject:
  head:
    #引入css文件的写法
    # - <link rel="stylesheet" href="/css/custom.css">
  bottom:
    # 可以引入多个 JS 文件
    # - <script src="/js/another.js"></script>
    
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  关于: /about/ || fas fa-heart
   
# 侧边栏
aside:
  enable: true
  position: right 
  card_author:
    enable: true                # 是否开启作者卡片
    description: 无法选中        # 个人简介
    button:                     # 卡片底部的按钮
      icon: fas fa-home         # 按钮图标
      text: Myself              # 按钮文字
      link: https://github.com/KTEC1200    
  card_announcement:
    enable: true # 公告
    content: 📢 欢迎您来～
  card_recent_posts:
    enable: true # 最新文章
  card_categories:
    enable: true # 分类
  card_tags:
    enable: true # 标签
  card_archives:
    enable: true # 归档
  card_webinfo:
    enable: true # 网站信息
    
# 侧边栏个人头像
avatar:
  img: /images/002.jpg
  
# 网站底部配置
footer:
  owner:
    enable: true
    since: 2024
  copyright: true
  custom_text: 
  theme:
    enable: false        
  framework:
    enable: false        
```

保存后切换回 Git Bash 窗口，输入 `hexo clean && hexo g && hexo s`，窗口底部弹出绿色信息 `Hexo is running at http://localhost:4000/`，在浏览器中访问 http://localhost:4000/，就会看到刚刚创建的博客

想在博客里面添加标签、分类等，确保在 **source** 文件夹里有对应文件夹和 **index.md** 文件

若过程中出现类似 `npm warn allow-scripts`的输出 ，在 Git Bash 窗口输入 `npm approve-scripts --allow-scripts-pending` 即可

#### 配置基础

在 **Blog** 文件夹下，找到 **_config.yml** 文件并打开，我的代码供参考：

```html
# Site
# 网站主标题
title: 红尘
# 网站副标题
subtitle: ''
# 网站描述，常用于SEO，会出现在搜索引擎结果中
description: 'いつかあなたの大切な人と再会できますように'
# 网站关键词
keywords:
# 网站作者
author: KTEC
# 网站语言
language: zh-CN
# 网站时区
timezone: 'Asia/Shanghai'

# URL
# 网站最终的访问地址（最后全弄好了之后再改）
url: http://example.com
# 文章的永久链接格式
permalink: :year/:month/:title/
permalink_defaults:
# 美化URL，删除 index.html 或 .html 后缀
pretty_urls:
  trailing_index: false # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# Directory
# 存放文章、页面等源文件
source_dir: source
# 生成静态网站文件的输出目录
public_dir: public
# 标签页面的路径
tag_dir: tags
# 归档页面的路径
archive_dir: archives
# 分类页面的路径
category_dir: categories
# 存放代码文件的目录
code_dir: downloads/code
i18n_dir: :lang
# 跳过渲染，直接复制到 public 目录的文件
skip_render:
  - admin/**

# Writing
# Markdown 文件的命名格式
new_post_name: :title.md 
# 新建文章时的默认布局
default_layout: post
# 是否将标题自动转换为首字母大写格式
titlecase: false 
# 控制外部链接是否在新标签页中打开
external_link:
  enable: true 
  field: site 
  exclude: ''
filename_case: 0
render_drafts: false
# 为每篇文章创建一个同名的资源文件夹
post_asset_folder: false
# 是否使用相对路径
relative_link: false
# 是否显示发布日期为未来的文章
future: true
syntax_highlighter: highlight.js
highlight:
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  preprocess: true
  line_number: true
  tab_replace: ''

# Home page setting
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
# 文章未指定分类时的默认分类
default_category: default
# 将分类名映射到更友好的 URL
category_map:
# 将标签名映射到更友好的 URL
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
# 日期显示格式
date_format: YYYY-MM-DD
# 时间显示格式
time_format: HH:mm:ss
updated_option: 'mtime'

# Pagination
# 每页显示的文章数量
per_page: 5
# 分页页面的URL目录
pagination_dir: page

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:

# Extensions
# 网站使用的主题
theme: butterfly

# Deployment
# 一键部署的配置
deploy:
  type: ''

#本地搜索
search:
  path: search.xml
  field: post
  content: true
  format: html
```

保存后切换回 Git Bash 窗口，输入 `hexo clean && hexo g && hexo s`，在浏览器中访问 http://localhost:4000/

#### 搭建Decap CMS 可视化后台

在 **Blog/source** 文件夹下，新建一个 **admin** 文件夹并打开，新建一个 **index.html**文件，并将官方调用代码复制进去并保存：

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

同目录再新建一个 **config.yml** 文件，填入基础映射逻辑并保存：

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
      
# 跳过指定文件的渲染。匹配到的文件将会被直接复制到 public 目录
skip_render: "admin/**"
```

### 推送到GitHub

1. 建立云端仓库：

   在 GitHub 网页端，点击右上角的 + 号，选择 **New repository**，为仓库命名，可见性选择 **Public**，不要勾选 Add a README file 等任何初始化选项，直接点击 **Create** 

2. 生成个人令牌：

   在 GitHub 网页端，点击右上角头像，选择 **Settings** ，在左侧菜单点击 **Developer settings** ，选择 **Personal access tokens** ➔ **Tokens (classic)**，点击右上角的 **Generate new token (classic)** 

   在配置页面中，Note：随意填写；Expiration：下拉选择 **No expiration**；Select scopes：在下方的权限复选框中，仅勾选 **repo** 

   然后滚动到最底部，点击 **Generate token**，此时屏幕上会出现一串以 `ghp_` 开头的乱码字符（也就是你的Token），**请将其复制并保存下来**

3. 本地环境封装：

   在 **Blog** 文件夹下，右键打开 Git Bash 窗口，依次输入以下命令：

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

### 推送到Netlify

#### 首次推送

访问[Netlify官网](https://www.netlify.com/)，选择 **GitHub** 进行一键授权登录，进入控制台面板后，点击 **Add new project** ，点击它正下方的 **GitHub** ，授权 Netlify 访问你的仓库列表，随后选中你的仓库

进入配置界面后，核对以下两项参数：

**Build command**： `hexo generate`

**Publish directory**： `public`

然后点击底部的 **Deploy site** ，等待约两分钟，当日志输出完毕，页面上方会生成一个以 `.netlify.app` 结尾的链接

#### 相关配置

1. 开启身份认证：

   在 Netlify 控制台，点击 **Site configuration**，在左侧菜单栏中找到 **Identity**，点击 **Enable Identity** 

2. 配置注册权限：

   在开启 Identity 后的设置面板中，找到 **Registration preferences**，确保其状态为 **Open** ，在稍后注册完主账号后，**<u>将其改回 Invite only</u>** 

3. 打通写入网关：

   在左侧菜单进入 **Identity** 下属的 **Services**，找到 **Git Gateway** ，点击 **Enable Git Gateway**

4. 访问admin：

   在浏览器中访问 `你的公网链接/admin`（如 `https://xxx.netlify.app/admin`），你就能看到一个独立的图形化登录界面，如果没有弹出登录框，或者重新 `git push` 提示`Recv failure: Connection was reset`，请按以下方法解决：

   - 在 Git Bash 窗口中执行 `ssh-keygen -t ed25519 -C "你的GitHub邮箱"`，然后**连续按 3 次回车键**

   - 密钥生成后，执行 `cat ~/.ssh/id_ed25519.pub`显示密钥，复制输出的这一长串密钥（以 `ssh-ed25519` 开头，以你的邮箱结尾）

   - 在 GitHub 网页端，点击右上角头像，选择 **Settings** ，在左侧菜单点击 **SSH and GPG keys**，点击 **New SSH key**，**Title** 随便填，**Key type** 保持默认，将刚才复制的密钥直接粘贴到下方的 Key 输入框中，点击 **Add SSH key** 

   - 回到 Git Bash窗口，执行 `git remote set-url origin git@github.com:Github名/仓库名.git`

   然后就可以 `git push` 重新推送了

### 博客书写

**_posts** 文件夹里的`.md` 文件最顶部的 `---` 包围区域叫 **Front-matter**，决定文章展示

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

其余书写参考 [markdown教程](https://www.bilibili.com/video/BV1d741147k2/?share_source=copy_web&vd_source=23bae3b73bc623c27e59350e7f3ac30b)
