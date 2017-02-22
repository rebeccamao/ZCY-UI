<script>
    export default {

    }
</script>

# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
## 代码演示

::: demo
<summary>
  #### 按钮类型
  按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。
</summary>

```html
<template>
    <div>
        <button type="button" class="zcy-btn">default</button>
        <button type="button" class="zcy-btn zcy-btn-primary">Primary</button>
        <button type="button" class="zcy-btn zcy-btn-dashed">dashed</button>
        <button type="button" class="zcy-btn zcy-btn-info">info</button>
        <button type="button" class="zcy-btn zcy-btn-Success">Success</button>
        <button type="button" class="zcy-btn zcy-btn-Warning">Warning</button>
        <button type="button" class="zcy-btn zcy-btn-Danger">Danger</button>
</div>
</template>
```
:::

::: demo
<summary>
  #### 按钮尺寸
  按钮有大、中、小三种尺寸。
</summary>

```html
<template>
    <div>
        <button type="button" class="zcy-btn zcy-btn-primary">default</button>
        <button type="button" class="zcy-btn zcy-btn-lg">Large</button>
        <button type="button" class="zcy-btn zcy-btn-small">small</button>
    </div>
</template>
```
:::

::: demo
<summary>
  #### 不可用状态
  添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
</summary>

```html
<template>
    <div>
        <button type="button" class="zcy-btn" disabled>default</button>
        <button type="button" class="zcy-btn zcy-btn-primary" disabled>Primary</button>
        <button type="button" class="zcy-btn zcy-btn-dashed" disabled>dashed</button>
        <button type="button" class="zcy-btn zcy-btn-Danger" disabled>Danger</button>
    </div>
</template>
```
:::

::: demo
<summary>
  #### 按钮组合
  可以将多个 Button 放入 btn-group 的容器中。
</summary>

```html
<template>
    <div>
        <div class="zcy-btn-group">
          <button type="button" class="zcy-btn"><span>Cancel</span></button>
          <button type="button" class="zcy-btn zcy-btn-primary"><span>OK</span></button>
        </div>
    </div>
</template>
```
:::
