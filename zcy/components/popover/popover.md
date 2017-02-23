<script>
    export default {
        mounted () {
          $('.show-popover').each((i, item) => {
            $(item).popover({
              title: 'title',
              placement: $(item).data('placement'),
              content: '内容'
            })
          })

          setTimeout(() => {
            // 自定义内容，动态修改
            $($('.show-popover')[0]).data('popover').setContent('<span>custom content</span>')
          }, 2000)
        }
    }
</script>

# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

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
        <button class="zcy-btn show-popover" data-placement="topLeft">TL</button>
        <button class="zcy-btn show-popover" data-placement="top">Top</button>
        <button class="zcy-btn show-popover" data-placement="topRight">TR</button>
      </div>
      <div style="width: 70px; float: left;">
        <button class="zcy-btn show-popover" data-placement="leftTop">LT</button>
        <button class="zcy-btn show-popover" data-placement="left">Left</button>
        <button class="zcy-btn show-popover" data-placement="leftBottom">LB</button>
      </div>
      <div style="width: 70px; float: right;">
        <button class="zcy-btn show-popover" data-placement="rightTop">RT</button>
        <button class="zcy-btn show-popover" data-placement="right">Right</button>
        <button class="zcy-btn show-popover" data-placement="rightBottom">RB</button>
      </div>
      <div style="margin-left: 70px; clear: both; white-space: nowrap;">
        <button class="zcy-btn show-popover" data-placement="bottomLeft">BL</button>
        <button class="zcy-btn show-popover" data-placement="bottom">Bottom</button>
        <button class="zcy-btn show-popover" data-placement="bottomRight">BR</button>
      </div>
    </div>
  </div>
</template>
```
:::


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| title     | 卡片标题                                 | string\|ReactNode | 无     |
| content   | 卡片内容                            | string\|ReactNode | 无     |