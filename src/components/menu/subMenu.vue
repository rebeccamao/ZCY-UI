<template lang="html">

  <li :class="subMenuCls" @mouseover="mouseTriggerOpen(true)" @mouseout="mouseTriggerOpen(false)">
    <div :class="titleCls" @click="clickTriggerOpen" :style="titleSty">
      <span>
        <i v-if="icon" class="`anticon anticon-${icon}`"></i>
        <span>{{title}}</span>
      </span>
    </div>
    <ul :class="itemCls">
      <slot></slot>
    </ul>
  </li>

</template>

<script>
export default {
  name: 'vSubmenu',
  props: {
    title: String,
    icon: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data:()=>({
    open: true,
    level:0,
    mode: 'vertical',
    timer: null
  }),
  created(){
    this.setLevelAndMode();
  },
  computed:{
    subMenuCls(){
      return [
        'zcy-menu-submenu',
        `zcy-menu-submenu-${this.mode}`,
        {'zcy-menu-submenu-open': this.open}
      ]
    },
    titleCls(){
      return [
        'zcy-menu-submenu-title',
        {'zcy-menu-submenu-disabled': this.disabled}
      ]
    },
    itemCls(){
      return [
        'zcy-menu',
        `zcy-menu-${this.mode}`,
        'zcy-menu-sub',
        {['zcy-menu-hidden']:!this.open}
      ]
    },
    titleSty(){
      return this.mode == 'inline'?{
          paddingLeft: 24 * this.level + 'px'
        }: '';
    }
  },
  methods: {
    setLevelAndMode(){
      let index = 1;
      let parent = this.$parent;

      while (parent.$options.name !== 'vMenu') {
        if(parent.$options.name == 'vSubmenu') index++;
        parent = parent.$parent;
      }

      this.mode = parent.mode;
      this.level = index;
    },
    clickTriggerOpen(){
      if(!this.disabled && this.mode == 'inline'){
        this.setOpen(!this.open);
      }
    },
    mouseTriggerOpen(status){
      if(!this.disabled && this.mode != 'inline'){
        if(this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => this.setOpen(status),300);
      }
    },
    setOpen(status){
      this.open = status;
    }
  }
}
</script>
