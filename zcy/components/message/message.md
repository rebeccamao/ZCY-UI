<script>
    export default {
        mounted () {
            $('#openMessage').on('click', () => {
              ZCY.Message.info("这是一条普通的提醒");
            })
            $('#openTypeMessage-success').on('click', () => {
              ZCY.Message.success("这是一条成功的提醒");
            })
            $('#openTypeMessage-warning').on('click', () => {
              ZCY.Message.warning("这是一条警告的提醒");
            })
            $('#openTypeMessage-error').on('click', () => {
              ZCY.Message.error("这是一条警告的提醒");
            })
            $('#openMessageCustomizeDuration').on('click', () => {
              ZCY.Message.success("这是一条延时的提醒", 10);
            })
        }
    }
</script>

# Message 消息框

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 代码演示

::: demo
<summary>
  #### 普通提示
  信息提醒反馈。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openMessage">
        <span>显示普通提醒</span>
    </button>
</template>
<script>
    $('#openMessage').on('click', () => {
      ZCY.Message.info("这是一条普通的提醒");
    })
</script>
```
:::

::: demo
<summary>
  #### 普通提示
  信息提醒反馈。
</summary>

```html
<template>
    <button type="button" class="zcy-btn" id="openTypeMessage-success">
        <span>success</span>
    </button>
    <button type="button" class="zcy-btn" id="openTypeMessage-error">
        <span>error</span>
    </button>
    <button type="button" class="zcy-btn" id="openTypeMessage-warning">
        <span>warning</span>
    </button>
</template>
<script>
    $('#openTypeMessage-success').on('click', () => {
        ZCY.Message.success("这是一条成功的提醒");
    })
    $('#openTypeMessage-warning').on('click', () => {
        ZCY.Message.warning("这是一条警告的提醒");
    })
    $('#openTypeMessage-error').on('click', () => {
        ZCY.Message.error("这是一条警告的提醒");
    })
</script>
```
:::

::: demo
<summary>
  #### 修改延时
  自定义时长 `10s`，默认时长为 `3s`。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openMessageCustomizeDuration">
        <span>显示延时提醒</span>
    </button>
</template>
<script>
    $('#openMessageCustomizeDuration').on('click', () => {
        ZCY.Message.success("这是一条延时的提醒", 10);
    })
</script>
```
:::

::: demo
<summary>
  #### 加载中
  进行全局 loading，异步自行移除。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openLoadingMessage">
        <span>显示加载中提醒</span>
    </button>
</template>
<script>

</script>
```
:::



### API

- `ZCY.Message.success(content, duration)`
- `ZCY.Message.error(content, duration)`
- `ZCY.Message.info(content, duration)`
- `ZCY.Message.warning(content, duration)`
- `ZCY.Message.loading(content, duration)`

### Props
组件提供了五个静态方法，参数如下：

| 参数       | 说明           | 类型                       | 默认值       |
|------------|----------------|--------------------------|--------------|
| content    | 提示内容       | string | -           |
| duration   | 自动关闭的延时，单位秒 | number               | 3          |

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

- `ZCY.Message.config(options)`
- `ZCY.Message.destroy()`

```js
ZCY.Message.config({
  top: 100,
  duration: 2,
});
```

| 参数       | 说明                | 类型                       | 默认值       |
|------------|--------------------|--------------------------|-------------|
| top        | 消息距离顶部的位置 | number                      | 24px        |
| duration   | 默认自动关闭延时，单位秒 | number                 | 3         |
