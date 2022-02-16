# 老大哥小助手

简单的正则测试小工具

[![MIT](https://img.shields.io/static/v1.svg?label=license&message=Apache+2&color=blue)](https://github.com/wanglong126/ldgtools/blob/master/LICENSE)
[![code-size](https://img.shields.io/github/languages/code-size/wanglong126/ldgtools.svg)](https://github.com/wanglong126/ldgtools/archive/master.zip)

## 开发初衷

之前是做winfrom（c#）开发，购置了mac后以往自编的小工具均无法mac运行

个人又不喜欢在线的一些工具，更喜欢离线随时可用的

正则功能是日常开发中非常常用的功能，为了能延续自己的使用习惯

重新使用 `Vue` ， `Electron` 写了这么一个支持mac的小工具（现学现用）

我最为常用的是数据生成，根据匹配结果，直接生成想要的数据格式

## 功能列表

- 正则匹配
- 正则替换
- 数据成成

## 即将增加

- 正则生成代码


![screen1](/images/screen1.png)
![screen2](/images/screen2.png)
![screen3](/images/screen3.png)

## 项目运行

### 初始化（仅首次）

**建议不要使用`cnpm`**

```
npm install
```

### 运行
```
npm run electron:serve
```



### 打包/编译
```
npm run electron:build
npm run electron:build-win
```


## 开源

本代码完全开源，但开发者是一枚新手，代码凌乱，无任何学习价值

记录开发过程，也希望有共同需求的童鞋一起享受便利，扩展升级

本项目采用Apache 2.0协议，如有借用，请保留指向该项目的链接。