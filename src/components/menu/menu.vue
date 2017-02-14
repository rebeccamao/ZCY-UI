<template lang="html">
  <ul :class="`zcy-menu zcy-menu-${mode} zcy-menu-${theme} zcy-menu-root`">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name:'vMenu',
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    theme: {
      type: String,
      default: 'light'
    },
  }
}
</script>
