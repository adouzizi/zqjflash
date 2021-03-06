# 前端搭建系列-搭建体系对接

## 一、背景

当业务缺乏对整个页面的统一数据描述，很难做到完全的数据驱动页面展示，在面对业务对性能、个性化等诉求中出现了一定的局限性

1. 模块开发成本高，使用的技术体系老旧，和集团模块规范隔离，无法享受现有构建&可视化生产等能力；
2. 数据投放在页面搭建场景只能覆盖普通投放，不能完整描述模块所有数据；
3. 模块数据排期&策略化能力依赖第三方系统，操作成本高且能力不完整；
4. 无线页面请求没有统一网关，无法做到一次请求，页面个性化。

## 二、搭建架构

### 2.1 在搭建解决方案中有几个系统、工具尤为重要，简单梳理一下层次关系

![build-system-struct.png](/assets/build-system-struct.png)

### 2.2 页面访问、渲染流程的时序图如下：

![build-system-sequence.png](/assets/build-system-sequence.png)

## 三、对接搭建之后解决了如下的问题

1. PC使用react体系开发，无线使用vue，修改技术体系带来的工作量和风险过大；
2. PC页面仍然有比较大的访问量，页面性能要求高，需要支持SSR；
3. 所有发布物料需要考虑跨地区部署；
4. PC、无线页面结构差异大，需要分开搭建、发布；
5. 资源位编辑需要提供banner、多语言录入等特定录入插件；