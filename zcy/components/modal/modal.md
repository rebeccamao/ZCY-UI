<script>
    export default {
        mounted () {
            $('#openModal').on('click', () => {
              ZCY.Modal.confirm({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
            })
            $('#openModalCanClose').on('click', () => {
              var modal = ZCY.Modal.confirm({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
              /* 对话框将在两秒后关闭 */
              setTimeout(() => {
                modal.close()
              }, 2000);
            })

            $('#openModal-success').on('click', () => {
              ZCY.Modal.success({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
            })
            $('#openModal-error').on('click', () => {
              ZCY.Modal.error({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
            })
            $('#openModal-warning').on('click', () => {
              ZCY.Modal.warning({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
            })
            $('#openModalLocale').on('click', () => {
                ZCY.Modal.confirm({
                    title: "标题",
                    content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容",
                    okText: "我要提交",
                    cancelText: "为啥提交",
                    onOk: function() {
                        console.info("onok")
                        // return false 则不会自动关闭
                        return false
                    },
                    onCancel: function() {
                        console.info("oncancel.....")
                    }
                });
            })
            $('#openModalCustom').on('click', () => {
              ZCY.Modal.open({
                title: "标题",
                template: "<div>test</div>",
                footer: '<div><button type="button" class="zcy-btn zcy-btn-ok">test</button></div>'
              })
            })
        }
    }
</script>

# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `ZCY.Modal.confirm()` 等方法。

## 代码演示

::: demo
<summary>
  #### 基本
  第一个对话框。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openModal">
        <span>显示对话框</span>
    </button>
</template>
<script>
    $('#openModal').on('click', () => {
        ZCY.Modal.info({title: "标题", content: "内容"});
    })
</script>
```
:::

::: demo
<summary>
  #### 异步关闭
  点击确定后异步关闭对话框，例如提交表单。
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-primary" id="openModalCanClose">
        <span>显示对话框</span>
    </button>
</template>
<script>
    $('#openModalCanClose').on('click', () => {
        var modal = ZCY.Modal.confirm({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
        /* 对话框将在两秒后关闭 */
        setTimeout(() => {
        modal.close()
        }, 2000);
    })
</script>
```
:::

::: demo
<summary>
  #### 信息提示
  各种类型的信息提示，只提供一个按钮用于关闭。
</summary>

```html
<template>
    <button type="button" class="zcy-btn" id="openModal-success">
        <span>success</span>
    </button>
    <button type="button" class="zcy-btn" id="openModal-error">
        <span>error</span>
    </button>
    <button type="button" class="zcy-btn" id="openModal-warning">
        <span>warning</span>
    </button>
</template>
<script>
    $$('#openModal-success').on('click', () => {
      ZCY.Modal.success({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
    })
    $('#openModal-error').on('click', () => {
      ZCY.Modal.error({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
    })
    $('#openModal-warning').on('click', () => {
      ZCY.Modal.warning({title: "标题", content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容"});
    })
</script>
```
:::

::: demo
<summary>
  #### 国际化
  设置 `okText` 与 `cancelText` 以自定义按钮文字
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-info" id="openModalLocale">
        <span>显示国际化对话框</span>
    </button>
</template>
<script>
    $('#openModalLocale').on('click', () => {
        ZCY.Modal.confirm({
            title: "标题",
            content: "这是很长的内容这是很长的内容这是很长的内容这是很长的内容",
            okText: "我要提交",
            cancelText: "为啥提交",
            onOk: function() {
                console.info("onok")
                // return false 则不会自动关闭
                return false
            },
            onCancel: function() {
                console.info("oncancel.....")
            }
        });
    })
</script>
```
:::

::: demo
<summary>
  #### 自定义样式
  自定义内容，包含body和footer两部分
</summary>

```html
<template>
    <button type="button" class="zcy-btn zcy-btn-info" id="openModalCustom">
        <span>显示自定义对话框</span>
    </button>
</template>
<script>
    $('#openModalCustom').on('click', () => {
        ZCY.Modal.open({
            title: "标题",
            template: "<div>test</div>",
            footer: '<div><button type="button" class="zcy-btn zcy-btn-ok">test</button></div>'
        });
    })
</script>
```
:::


## API

### Modal Props
| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | string | 无           |
| closable   | 是否显示右上角的关闭按钮 | boolean    | `true`        |
| maskClosable | 点击蒙层是否允许关闭 | boolean   | `true`       |
| okText     | 确认按钮文字    | string           | `确定`      |
| cancelText | 取消按钮文字    | string           | `取消`       |
| slot:footer     | 底部内容       | string | 确定取消按钮 |
| width      | 宽度           | number | 520           |

### Modal Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| ok       | 点击确定时触发       | 无           |
| cancel   | 点击遮罩层或右上角叉或取消按钮时触发  | 无         |

### ZCY.Modal.xxx()

包括：

- `ZCY.Modal.info`
- `ZCY.Modal.success`
- `ZCY.Modal.error`
- `ZCY.Modal.warning`
- `ZCY.Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | string | 无           |
| content    | 内容           | string | 无           |
| width      | 宽度           | number | 416           |
| okText     | 确认按钮文字    | string           | 确定(只有确定按钮时为`知道了`)       |
| cancelText | 取消按钮文字    | string           | 取消       |
| onOk       | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭      | function         | 无           |
| onCancel   | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭       | function         | 无           |
| maskClosable | 点击蒙层是否允许关闭 | boolean   | `false`    |
