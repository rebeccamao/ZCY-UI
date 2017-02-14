<template>
  <div class="page-wrapper">
    <header class="clearfix">
      <div class="zcy-row">
        <div class="zcy-col-xs-24 zcy-col-sm-7 zcy-col-md-6 zcy-col-lg-4">
          <a id="logo" href="https://github.com/ZCY-frontend/ZCY-UI" target="_blank" title="github"><img alt="logo" src="./assets/zcy-logo.png"><span>ZCY-UI-Jquery</span></a>
        </div>
      </div>

      <div class="nav zcy-col-xs-0 zcy-col-sm-17 zcy-col-md-18 zcy-col-lg-20">
      </div>
    </header>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>

export default {
}

</script>

<style scoped lang="less">

header {
    transition: opacity .5s;
    background: #fff;
    border-bottom: 1px solid #eee;
    height: 80px;
    margin-bottom: 24px;
    padding: 0 4%;
    width: 100%;
}

#logo {
    float: left;
    height: 80px;
    line-height: 80px;

    img {
      height: 54px;
      margin-top: 14px;
      margin-right: 8px;
    }

    span {
        float: right;
        font-size: 16px;
        font-family: Raleway,Hiragino Sans GB,sans-serif;
        line-height: 94px;
        font-weight: bold;
        color: #666;
    }
}

</style>