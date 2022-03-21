<template>
  <div class="header" v-if="playlist.id">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(playlist.coverImgUrl, 400)" />
    </div>
    <div class="content">
      <div class="title-wrap">
        <span class="playlist-tag">歌单</span>
        <p class="title">{{ playlist.name }}</p>
      </div>
      <div class="creator-wrap">
        <img :src="playlist.creator.avatarUrl" class="avatar" />
        <p class="creator">{{ playlist.creator.nickname }}</p>
        <p class="create-time">{{ $utils.formatDate(playlist.createTime, 'yyyy-MM-dd') }} 创建</p>
      </div>
      <div class="action-wrap">
        <NButton @click="playAll" class="button">
          <Icon class="icon middle" color="gray" type="play-round" />
          <span class="middle">播放全部</span>
        </NButton>
      </div>
      <div class="desc-wrap">
        <p class="desc" v-if="tagsText">
          <span>
            标签：
            <span class="tag" v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}<span class="divide"> / </span>
            </span>
          </span>
        </p>
        <p class="desc">
          <span class="label">
            歌曲：<span class="text">{{ playlist.trackCount }}</span>
          </span>
          <span>
            播放：<span class="text">{{ $utils.formatNumber(playlist.playCount) }}</span>
          </span>
        </p>
        <p class="desc" v-if="playlist.description">
          <span class="value">
            <FoldText>简介：{{ playlist.description }}</FoldText>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from '@/store/helper/music'

  export default {
    name: 'DetailHeader',
    props: {
      playlist: {
        type: Object,
        default: () => ({}),
      },
      songs: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      playAll() {
        this.startSong(this.songs.find(({ vip, fl }) => vip !== 1 && fl !== 0))
        this.setPlaylist(this.songs)
      },
      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
    computed: {
      tagsText() {
        return this.playlist.tags.join(' / ')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    padding: 36px;

    .img-wrap {
      width: 200px;
      height: 200px;
      margin-right: 24px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .title-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .playlist-tag {
          font-size: 13px;
          display: inline-block;
          margin-right: 8px;
          margin-bottom: 2px;
          padding: 2px 2px;
          border: 1px solid currentColor;
          border-radius: 2px;
          color: $theme-color;
          cursor: default;
          white-space: nowrap;
          line-height: 13px;
        }

        .title {
          font-size: $font-size-title;
          font-weight: bolder;
          color: $font-color;
        }
      }

      .action-wrap {
        margin-bottom: 18px;

        .button {
          background: #6f00ff;
          background: linear-gradient(to right, #6f00ff, #7700ff, #5b00d1);
          color: $gray;
          border: none;
          border-radius: 20px;

          .icon {
            margin-right: 4px;
          }

          .middle {
            vertical-align: middle;
          }

          &:hover {
            background: $theme-hover;
          }
        }
      }

      .creator-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 18px;

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
          cursor: pointer;
        }

        .creator {
          color: $blue;
          margin-right: 8px;
          cursor: pointer;

          &:hover {
            color: $blue-hover;
          }
        }

        .create-time {
          color: $font-color-grey-shallow;
          font-size: $font-size-sm;
        }
      }

      .desc {
        margin-bottom: 8px;

        .tag {
          color: $blue;
          cursor: pointer;

          &:last-child {
            span:nth-last-of-type(1) {
              display: none;
            }
          }

          &:hover {
            color: $blue-hover;
          }

          .divide {
            color: $font-color-grey-shallow;
            cursor: default;
          }
        }

        .label {
          display: inline-block;
          margin-right: 10px;
        }

        .text {
          color: $font-color-grey-shallow;
        }

        .value {
          width: 950px;
        }
      }
    }
  }
</style>
