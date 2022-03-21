// mv详情页面
<template>
  <div class="mv-layout">
    <div class="mv" v-if="$utils.isDef(mvDetail.id)">
      <div class="mv-content">
        <div class="left">
          <p class="title" @click="back"><Icon type="back" /> MV详情</p>

          <div class="player">
            <VideoPlayer :url="mvPlayInfo.url" :poster="mvDetail.cover" ref="video" />
          </div>

          <div class="author-wrap">
            <div class="avatar">
              <img v-lazy="$utils.genImgUrl(artist.picUrl, 120)" />
            </div>
            <p class="author">{{ artist.name }}</p>
          </div>

          <p class="name">{{ mvDetail.name }}</p>

          <div class="desc">
            <span class="date">发布：{{ $utils.formatDate(mvDetail.publishTime, 'yyyy-MM-dd') }}</span>
            <span class="count">播放：{{ $utils.formatNumber(mvDetail.playCount) }}次</span>
          </div>

          <div class="comments">
            <Comments :id="id" type="mv" />
          </div>
        </div>
        <div class="right">
          <p class="title">相关推荐</p>
          <div class="simi-mvs">
            <BigCard
              :desc="`by ${simiMv.artistName}`"
              :key="simiMv.id"
              :name="simiMv.name"
              @click="$utils.goMv(simiMv.id)"
              class="simi-mv-card"
              v-for="simiMv in simiMvs"
            >
              <template v-slot:img-wrap>
                <MvCard :duration="simiMv.duration" :img="simiMv.cover" :playCount="simiMv.playCount" :iconSize="38" />
              </template>
            </BigCard>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <GoTop />
  </div>
</template>

<script>
  import { getMvDetail, getMvUrl, getArtists, getSimiMv } from '@/api'
  import { hideMenuMixin } from '@/utils'
  import { mapMutations } from '@/store/helper/music'
  import Comments from '@/components/Comments'
  import MvCard from '@/components/MvCard'

  export default {
    name: 'Mv',
    mixins: [hideMenuMixin],
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    metaInfo() {
      return {
        title: this.mvDetail.name,
      }
    },
    created() {
      this.init()
    },
    data() {
      return {
        mvDetail: {},
        mvPlayInfo: {},
        artist: {},
        simiMvs: [],
      }
    },
    methods: {
      async init() {
        const [{ data: mvDetail }, { data: mvPlayInfo }, { mvs: simiMvs }] = await Promise.all([
          getMvDetail(this.id),
          getMvUrl(this.id),
          getSimiMv(this.id),
        ])
        const { artist } = await getArtists(mvDetail.artistId)

        this.mvDetail = mvDetail
        this.mvPlayInfo = mvPlayInfo
        this.artist = artist
        this.simiMvs = simiMvs

        this.$nextTick(() => {
          const player = this.$refs.video.player
          player.on('play', () => {
            // 停止播放歌曲
            this.setPlayingState(false)
          })
        })
      },
      goMv(id) {
        this.$router.push(`/mv/${id}`)
      },
      // 后退
      back() {
        this.$router.back()
      },
      goTop() {
        this.$el.scrollTop = 0
      },

      ...mapMutations(['setPlayingState']),
    },
    watch: {
      id() {
        this.goTop()
        this.init()
      },
    },
    components: { Comments, MvCard },
  }

  // eslint-disable-next-line no-unused-vars
  function genResource(brs, mvPlayInfo) {
    const { url: mvPlayInfoUrl, r: mvPlayInfoBr } = mvPlayInfo
    const keyNameMap = {
      240: '标清',
      480: '高清',
      720: '超清',
      1080: '1080P',
    }

    return Object.keys(brs).map((key) => {
      // 优先使用mvPlayInfo里的数据
      const findPreferUrl = key === mvPlayInfoBr
      const name = keyNameMap[key]
      const url = findPreferUrl ? mvPlayInfoUrl : brs[key]
      return {
        url,
        name,
      }
    })
  }
</script>

<style lang="scss" scoped>
  .mv-layout {
    width: 100%;
    color: $font-color;
    overflow: auto;
    overflow-x: hidden;
  }

  .mv {
    padding: $page-padding;
    margin: 0 auto;

    .title {
      display: inline-block;
      margin-bottom: 16px;
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
    }

    .mv-content {
      display: flex;
      max-width: $mv-detail-max-width;
      min-width: $mv-detail-min-width;
      margin: auto;

      .left {
        flex: 1;

        .title {
          cursor: pointer;
        }

        .player {
          margin-bottom: 16px;
          overflow: hidden;
        }

        .author-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 32px;

          .avatar {
            @include img-wrap(60px);
            margin-right: 8px;
            img {
              @include round(60px);
            }

            cursor: pointer;
          }

          .author {
            font-size: $font-size-lg;
            cursor: pointer;

            &:hover {
              color: #000000;
            }
          }
        }

        .name {
          margin-bottom: 16px;
          font-size: $font-size-title-lg;
          font-weight: $font-weight-bold;
        }

        .desc {
          display: flex;
          color: $font-color-gray-shallow;
          font-size: $font-size-sm;

          .date {
            display: inline-block;
            margin-right: 24px;
          }
        }

        .comments {
          margin-top: 48px;
        }
      }

      .right {
        width: 36%;
        padding-left: 32px;

        .title {
          padding-left: 3px;
          cursor: default;
        }

        .simi-mvs {
          margin-top: -8px;
          padding: -8px 0;

          .simi-mv-card {
            padding: 8px 0;
            padding-left: 3px;
          }
        }
      }
    }
  }
</style>
