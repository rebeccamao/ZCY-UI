<script>
  export default {
    mounted () {
      console.info(ZCY.Lang.isNumber(1))
    }
  }
</script>

## Alert 警告

用于页面中展示重要的提示信息。

::: demo
<summary>
  #### 四种样式
  四种样式。
</summary>

### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。
## i18n

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | 标题，**必选参数** | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
