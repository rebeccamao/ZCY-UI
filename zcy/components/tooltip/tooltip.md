<script>
    export default {
        mounted () {
          $('.js-show-tooltip').each((i, item) => {
            $(item).tooltip({
              placement: $(item).data('placement'),
              content: '内容'
            })
          })
        }
    }
</script>

# Tooltip 文字提示

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

## 代码演示

::: demo
<summary>
  #### 基本
  最简单的用法，浮层的大小由内容区域决定。
</summary>

```html
<template>
  <div class="zcy-row">
    <div class="zcy-col-11">
      <div style="margin-left: 70px; white-space: nowrap;">
        <button class="zcy-btn js-show-tooltip" data-placement="topLeft">TL</button>
        <button class="zcy-btn js-show-tooltip" data-placement="top">Top</button>
        <button class="zcy-btn js-show-tooltip" data-placement="topRight">TR</button>
      </div>
      <div style="width: 70px; float: left;">
        <button class="zcy-btn js-show-tooltip" data-placement="leftTop">LT</button>
        <button class="zcy-btn js-show-tooltip" data-placement="left">Left</button>
        <button class="zcy-btn js-show-tooltip" data-placement="leftBottom">LB</button>
      </div>
      <div style="width: 70px; float: right;">
        <button class="zcy-btn js-show-tooltip" data-placement="rightTop">RT</button>
        <button class="zcy-btn js-show-tooltip" data-placement="right">Right</button>
        <button class="zcy-btn js-show-tooltip" data-placement="rightBottom">RB</button>
      </div>
      <div style="margin-left: 70px; clear: both; white-space: nowrap;">
        <button class="zcy-btn js-show-tooltip" data-placement="bottomLeft">BL</button>
        <button class="zcy-btn js-show-tooltip" data-placement="bottom">Bottom</button>
        <button class="zcy-btn js-show-tooltip" data-placement="bottomRight">BR</button>
      </div>
    </div>
  </div>

   <script>
    $('.js-show-tooltip').each((i, item) => {
      $(item).tooltip({
        placement: $(item).data('placement'),
        content: '内容'
      })
    })
  </script>
</template>
```
:::


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| title     | 卡片标题                                 | string\|ReactNode | 无     |
| content   | 卡片内容                            | string\|ReactNode | 无     |