<script>
    export default {
        mounted () {
            $('#openNotification').on('click', () => {
              ZCY.Notification.open({title: '完成', message:"这是一条普通的提醒"});
            })
            $('#openTypeNotification-success').on('click', () => {
              ZCY.Notification.success({title: '完成', message:"这是一条成功的提醒"});
            })
            $('#openTypeNotification-warning').on('click', () => {
              ZCY.Notification.warning({title: '完成', message:"这是一条警告的提醒"});
            })
            $('#openTypeNotification-error').on('click', () => {
              ZCY.Notification.error({title: '完成', message:"这是一条错误的提醒"});
            })
            $('#openNotificationInfinite').on('click', () => {
              ZCY.Notification.open({
                  title: '完成',
                  message:"这是一条成功的提醒",
                  duration: 0,
                  key: 'noclose',
                  onClose: function() {
                      console.info('colse Notification...')
                  }
              });
            })
            $('#closeNotice').on('click', () => {
              ZCY.Notification.close('noclose');
            })
        }
    }
</script>

# Notification 通知提醒框

全局展示通知提醒信息。

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 代码演示

::: demo
<summary>
  #### 基本
  最简单的用法，4.5 秒后自动关闭。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openNotification">
        <span>显示普通提醒</span>
    </button>
</template>
<script>
    $('#openNotification').on('click', () => {
      ZCY.Notification.open({title: '完成', message:"这是一条普通的提醒"});
    })
</script>
```
:::

::: demo
<summary>
  #### 带有Icon的通知提醒框
  通知提醒框左侧有图标。
</summary>

```html
<template>
    <button type="button" class="zcy-btn" id="openTypeNotification-success">
        <span>success</span>
    </button>
    <button type="button" class="zcy-btn" id="openTypeNotification-error">
        <span>error</span>
    </button>
    <button type="button" class="zcy-btn" id="openTypeNotification-warning">
        <span>warning</span>
    </button>
</template>
<script>
    $('#openTypeNotification-success').on('click', () => {
      ZCY.Notification.success({title: '完成', message:"这是一条成功的提醒"});
    })
    $('#openTypeNotification-warning').on('click', () => {
        ZCY.Notification.warning({title: '完成', message:"这是一条成功的提醒"});
    })
    $('#openTypeNotification-error').on('click', () => {
        ZCY.Notification.error({title: '完成', message:"这是一条成功的提醒"});
    })
</script>
```
:::

::: demo
<summary>
  #### 自动关闭的延时
  自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。
  可通过ZCY.Notification.close(selfKey) 手动关闭通知框
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openNotificationInfinite">
        <span>打开通知提醒框</span>
    </button>
    <button type="button" class="zcy-btn zcy-btn-primary" id="closeNotice">
        <span>关闭通知提醒框</span>
    </button>
</template>
<script>
    $('#openNotificationInfinite').on('click', () => {
        ZCY.Notification.open({title: '完成', message:"这是一条成功的提醒", duration: 0, key: 'noclose'});
    })
    $('#closeNotice').on('click', () => {
        ZCY.Notification.close('noclose');
    })
</script>
```
:::

### API

- `ZCY.Notification.open(config)`
- `ZCY.Notification.success(config)`
- `ZCY.Notification.error(config)`
- `ZCY.Notification.warning(config)`
- `ZCY.Notification.close(key:String)`

### Props
组件提供了五个静态方法，参数如下：

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | 通知提醒标题，必选                                 | string  | -     |
| description | 通知提醒内容，必选                                | string  | -     |
| key        | 当前通知唯一标志                                   | string      | -     |
| duration   | 默认自动关闭延时，设置为 null或者0 则不自动关闭,单位秒        | number    | 4.5     |
| onClose    | 关闭通知弹框时触发的回调函数     | Function    | -     |


还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

- `ZCY.Notification.config(options)`
- `ZCY.Notification.destroy()`

```js
ZCY.Notification.config({
  top: 100,
  placement: "topLeft"
  duration: 2,
});
```
| 参数       | 说明               | 类型                       | 默认值       |
|------------|--------------------|----------------------------|--------------|
| placement  | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string | topRight |
| top        | 消息从顶部弹出时，距离顶部的位置，单位像素。 | number    | 24        |
| bottom     | 消息从底部弹出时，距离底部的位置，单位像素。 | number    | 24        |
| duration   | 默认自动关闭延时，单位秒 | number                       | 4.5         |
