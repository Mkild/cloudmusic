<template>
  <footer class="footer">
    <div class="layout">
      <!-- 左侧区域 -->
      <div class="left">
        <p>网易公司版权所有©1997-2022</p>
        <p>仅限用于学习、交流目的，不得用于任何商业用途。</p>
      </div>

      <!-- 右侧区域 -->
      <div class="right">
        <a href="https://github.com/Mkild" target="_blank"><Icon :size="40" type="github" /></a>
        <a href="mailto:1427756365@qq.com" target="_blank"><Icon :size="40" type="email" /></a>
        <img src="@/assets/image/buwan-project.png" />
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: block;
    min-width: $footer-min-width;
    line-height: 1.15;
    font-size: 12px;
    color: #333;
    position: relative;
    overflow: hidden;
    height: $footer-height;
    border-top: 1px solid #d3d3d3;
    background: #ffffff;

    .layout {
      color: #333;
      position: relative;
      width: 1100px;
      margin: 0 auto;
    }

    // 左侧区域
    .left {
      float: left;
      width: 560px;
      background-position: -400px -140px;
      line-height: 22px;
    }

    // 右侧区域
    .right {
      display: flex;
      align-items: center;

      margin-top: 15px;
      position: relative;

      a {
        text-decoration: none; // 去除默认的下划线

        &:hover {
          color: $green;
        }

        &:nth-child(2):before {
          content: '';
          font-size: 0;
          padding: 30px 3px 1px;
          margin-left: 6px;
          border-left: 1px solid #c7c5c5;
        }
      }

      img {
        object-fit: scale-down;
        width: 300px;
        height: 30px;
        margin-left: 10px;
      }
    }
  }
</style>
