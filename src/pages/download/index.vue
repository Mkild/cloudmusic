<template>
  <div class="download">
    <!-- 下载区块 start -->
    <div class="download-section">
      <div class="download-section-layout">
        <!-- 左侧区域-下载电脑端 start -->
        <div class="download-section-left">
          <div class="download-section-title">在电脑上听</div>
          <img
            class="download-section-image"
            src="https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"
          />
          <div class="icon-box">
            <img
              src="https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_mac_black_new.bbaa33f484108e702bc365c250b74e79.png"
            />
            <img
              src="https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/windows.3e335fd6d5078918ef80f7e54d0bd4b8.png"
            />
          </div>
          <div class="download-button" @click="downloadPc">下载电脑端</div>
        </div>
        <!-- 左侧区域-下载电脑端 end -->

        <!-- 右侧区域-下载手机端 start -->
        <div class="download-section-right">
          <div class="download-section-title">在手机上听</div>
          <img
            class="download-section-image"
            src="https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"
          />
          <div class="icon-box">
            <img
              src="https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_iphone_black_new.3c51a3730124d2d8d662aa4393572914.png"
            />
            <img
              src="https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/android.f73995b4ecd8636ecb3819906598ec13.png"
            />
          </div>
          <el-popover placement="top" trigger="click" title="扫描二维码下载">
            <div slot="reference" class="download-button">下载手机端</div>
            <div class="qrcode">
              <img src="https://p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png" alt="移动端下载" />
            </div>
          </el-popover>
        </div>
        <!-- 右侧区域-下载手机端 end -->

        <!-- 弹出框-其他操作系统客户端 start -->
        <el-popover placement="bottom-end" trigger="click">
          <div slot="reference" class="download-other">
            <i class="iconfont icon-component el-icon-bottom"></i>
            其他操作系统客户端
          </div>
          <div class="iconlist">
            <a
              class="iconlist-item"
              href="javascript:void(0)"
              hidefocus="true"
              v-for="item in iconlist"
              :key="item.id"
              @click="downloadClient(item.url)"
            >
              <img :src="item.pic" />
              {{ item.title }}
            </a>
          </div>
        </el-popover>
        <!-- 弹出框-其他操作系统客户端 end -->
      </div>
    </div>
    <!-- 下载区块 end -->

    <!-- 优势宣传区块 -->
    <div class="list">
      <!-- 列表项 start -->
      <div class="advantage-section" v-for="item in advantagelist" :key="item.id">
        <div class="advantage-section-layout">
          <!-- 左侧区域-宣传语 srart -->
          <div class="advantage-section-left">
            <h1 class="advantage-section-title">{{ item.title }}</h1>
            <p class="advantage-section-txt" v-html="item.txt"></p>
          </div>
          <!-- 左侧区域-宣传语 end -->

          <!-- 右侧区域-宣传图 start -->
          <div class="advantage-section-right">
            <img :src="item.pic" />
          </div>
          <!-- 右侧区域-宣传图 start -->
        </div>
      </div>
      <!-- 列表项 end -->
    </div>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script>
  import Footer from '@/components/Footer'

  export default {
    name: 'Download',
    components: { Footer },
    metaInfo() {
      return {
        title: '下载网易云音乐iPhone、iPad、Mac、Android、WP、PC版客户端',
      }
    },
    data() {
      return {
        // 弹出框的icon列表
        iconlist: [
          {
            id: 1,
            title: 'Android版',
            pic: require('@/assets/image/icon_android.png'),
            url: 'https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.7.11.220318190241_32.apk',
          },
          {
            id: 2,
            title: 'iphone版',
            pic: require('@/assets/image/icon_iphone.png'),
            url: 'https://apps.apple.com/cn/app/id590338362',
          },
          {
            id: 3,
            title: 'iPad版',
            pic: require('@/assets/image/icon_iphone.png'),
            url: 'https://apps.apple.com/cn/app/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90hd/id871041757',
          },
          {
            id: 4,
            title: 'Mac版',
            pic: require('@/assets/image/icon_mac.png'),
            url: 'https://d1.music.126.net/dmusic/NeteaseMusic_2.3.8.872_web.dmg',
          },
          {
            id: 5,
            title: 'PC版',
            pic: require('@/assets/image/icon_window.png'),
            url: 'https://d1.music.126.net/dmusic/cloudmusicsetup2.9.7.199711.exe',
          },
          {
            id: 6,
            title: 'UWP版',
            pic: require('@/assets/image/icon_window.png'),
            url: 'https://www.microsoft.com/zh-cn/p/%e7%bd%91%e6%98%93%e4%ba%91%e9%9f%b3%e4%b9%90uwp/9nblggh6g0jf?rtc=1&activetab=pivot:overviewtab',
          },
          {
            id: 7,
            title: 'WP版',
            pic: require('@/assets/image/icon_window.png'),
            url: 'https://music.163.com/stat/?web=wp&from=download&t=1636296874328&redirect=http%3A%2F%2Fwww.windowsphone.com%2Fs%3Fappid%3Ddb9dbdaa-464e-4370-a078-800fc7983d39',
          },
          {
            id: 8,
            title: 'Linux版',
            pic: require('@/assets/image/icon_linux.png'),
            url: 'https://d1.music.126.net/dmusic/netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb',
          },
        ],

        // 优势宣传列表
        advantagelist: [
          {
            id: 1,
            title: '千万曲库 首首CD音质',
            txt: '囊括百万<em>无损</em>SQ音乐，你在用手机听歌时，<br />也能感受到纤毫毕现的CD音质，更能免费离线收听',
            pic: 'https://p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg',
          },
          {
            id: 2,
            title: '千位明星 亲自推荐音乐',
            txt: '韩红，戴佩妮等<em>千位明星已入驻</em>，亲自创建私房歌单，录制独<br />家DJ节目，推荐他们心中的好音乐',
            pic: 'https://p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg',
          },
          {
            id: 3,
            title: '社交关系 发现全新音乐',
            txt: '你可以<em>关注明星</em>、DJ和好友，通过浏览他们的动态、收藏和<br />分享，发现更多全新好音乐',
            pic: 'https://p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg',
          },
          {
            id: 4,
            title: '手机电脑 歌单实时同步',
            txt: '只要一个帐号，你就可以同步在手机、电脑上创建、收藏<br />的歌单，<em>随时随地畅享好音乐</em>',
            pic: 'https://p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg',
          },
          {
            id: 5,
            title: '听歌识曲 助你疯狂猜歌',
            txt: '歌曲很动听却不知道歌名，歌名在嘴边却想不起来……<br />用<em>听歌识曲</em>功能，几秒钟就知道歌名',
            pic: 'https://p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg',
          },
        ],
      }
    },
    methods: {
      // 下载PC客户端
      downloadPc() {
        window.open('https://d1.music.126.net/dmusic/cloudmusicsetup2.9.7.199711.exe')
      },

      // 下载其他客户端
      downloadClient(url) {
        window.open(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .download {
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    line-height: 1.15;
    font-size: 12px;
    color: #333333;
  }

  .download-section-layout {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }

  .download-section {
    width: 100%;
    min-width: $download-min-width;
    background: url('https://p1.music.126.net/LwY0PYMc2NVWwbIzvGFKcA==/109951164205104153.png') no-repeat;
    background-color: #222222;
    background-size: cover;

    .download-section-image {
      height: 273px;
    }

    .download-section-left {
      display: inline-block;
      width: 556px;
      height: 100%;
      text-align: center;
      padding: 80px 0 112px;
    }

    .download-section-right {
      display: inline-block;
      margin-left: 220px;
      width: 300px;
      height: 100%;
      text-align: center;
    }

    .download-section-title {
      width: 100%;
      text-align: center;
      font-size: 22px;
      opacity: 0.8;
      color: #ffffff;
      margin-bottom: 23px;
    }

    .icon-box {
      margin: 20px 0;
      img {
        height: 44px;
        margin: 0 15px;
      }
    }

    .download-button {
      width: 300px;
      height: 65px;
      margin: 0 auto;
      border-radius: 65px;
      background-color: $white;
      color: $theme-color;
      font-size: 22px;
      line-height: 65px;
      text-align: center;
      cursor: pointer;
      box-sizing: content-box;

      &:hover {
        opacity: 0.7;
      }
    }

    .download-other {
      position: absolute;
      line-height: 60px;
      height: 60px;
      top: 0;
      right: 0;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      opacity: 0.7;

      .icon-component {
        background-color: #706e6e;
        color: #000000;
        font-weight: bolder;
        border-radius: 25px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
      }

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .qrcode {
    img {
      width: 164px;
    }
  }

  .iconlist {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 276px;

    .iconlist-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      width: 100px;
      height: 45px;
      padding: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 45px;
      background: rgba(0, 0, 0, 0.08);
      color: #333333;

      img {
        width: 26px;
        height: 26px;
      }
    }
  }

  .list {
    display: block;
    overflow: hidden;
    min-width: $download-min-width;
    $odd: rgb(255, 255, 255);
    $even: rgb(248, 248, 248);

    // 列表奇偶项规则
    .advantage-section {
      // 奇数项
      &:nth-child(odd) {
        background: $odd;
        .advantage-section-left {
          float: left;
          margin-left: 30px;
        }
        .advantage-section-right {
          float: right;
          margin-right: 57px;
        }
      }

      // 偶数项
      &:nth-child(even) {
        background: $even;
        .advantage-section-left {
          float: right;
        }
        .advantage-section-right {
          float: left;
          margin-left: 30px;
        }
      }
    }
  }

  .advantage-section-layout {
    overflow-wrap: break-word;
    width: 1000px;
    margin: 0px auto;
    overflow: hidden;
  }

  // 默认样式
  .advantage-section {
    color: rgb(51, 51, 51);
    overflow-wrap: break-word;
    border-bottom: 1px solid rgb(227, 227, 227);
    height: 437px;
    display: flex;
    align-items: center;

    .advantage-section-left {
      .advantage-section-title {
        margin: 0px;
        font-size: 40px;
        font-weight: normal;
        padding: 45px 0px 5px;
      }

      .advantage-section-txt {
        padding: 0px;
        margin: 0px;
        font-size: 16px;
        color: rgb(102, 102, 102);
        line-height: 24px;

        // 富文本高亮
        &::v-deep em {
          font-style: normal;
          color: $theme-color;
        }
      }
    }

    .advantage-section-right {
      font-size: 12px;
      color: rgb(51, 51, 51);

      img {
        max-width: 463px;
        max-height: 355px;
      }
    }
  }
</style>
