<script>
    export default {
        mounted () {
            ZCY.Upload.boot()
        }
    }
</script>

# Upload 文件上传

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
  <div class="js-zcy-upload"></div>

  <div id="filelist">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>
<br />

<div id="container">
    <a id="pickfiles" href="javascript:;">[Select files]</a>
    <a id="uploadfiles" href="javascript:;">[Upload files]</a>
</div>

<br />
<pre id="console"></pre>
</template>
```
:::
