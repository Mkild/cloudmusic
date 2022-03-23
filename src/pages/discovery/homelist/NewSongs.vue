<template>
  <!-- 最新音乐 -->
  <div class="new-songs">
    <Title :index="'/discovery/songs'">最新音乐 <Icon type="forward" /></Title>
    <div class="list-wrap">
      <div :key="listIndex" class="list" v-for="(list, listIndex) in thunkedList">
        <SongCard
          :key="item.id"
          :order="getSongOrder(listIndex, index)"
          @click.native="onClickSong(listIndex, index)"
          class="song-card"
          v-bind="nomalizeSong(item)"
          v-for="(item, index) in list"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from '@/store/helper/music'
  import { getNewSongs } from '@/api'
  import SongCard from '@/components/SongCard'
  import { confirm } from '@/base/confirm'
  import { createSong } from '@/utils'

  const songsLimit = 12

  export default {
    name: 'NewSongs',
    components: { SongCard },
    async created() {
      const { result } = await getNewSongs({ limit: 12 })
      this.list = result
    },
    data() {
      return {
        chunkLimit: Math.ceil(songsLimit / 3),
        list: [],
      }
    },
    methods: {
      onclickTitle() {
        this.$router.push('/discovery/songlist')
      },

      getSongOrder(listIndex, index) {
        return listIndex * this.chunkLimit + index + 1
      },
      nomalizeSong(song) {
        const {
          id,
          name,
          song: {
            alias,
            mvid,
            artists,
            album,
            album: { blurPicUrl },
            duration,
            fee,
            privilege: { fl, playMaxbr },
          },
        } = song
        return createSong({
          id,
          name,
          alia: alias[0],
          img: blurPicUrl,
          artists,
          duration,
          albumName: album.name,
          albumId: album.id,
          mvId: mvid,
          vip: fee,
          playMaxbr,
          fl,
        })
      },
      onClickSong(listIndex, index) {
        // 这里因为getSongOrder是从1开始显示, 所以当做数组下标需要减一
        const nomalizedSongIndex = this.getSongOrder(listIndex, index) - 1
        const nomalizedSong = this.normalizedSongs[nomalizedSongIndex]
        if (nomalizedSong.fl === 0) {
          confirm('因版权方要求，该资源暂时无法播放', '当前歌曲暂无音源')
          return
        }
        this.startSong(nomalizedSong)
        this.setPlaylist(this.normalizedSongs)
      },
      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
    computed: {
      thunkedList() {
        return [
          this.list.slice(0, this.chunkLimit),
          this.list.slice(this.chunkLimit, this.chunkLimit + 4),
          this.list.slice(this.chunkLimit + 4, this.list.length),
        ]
      },
      normalizedSongs() {
        return this.list.map((song) => this.nomalizeSong(song))
      },
    },
  }
</script>

<style lang="scss" scoped>
  .new-songs {
    margin-bottom: 36px;
    .list-wrap {
      display: flex;

      .list {
        flex: 1;
        overflow: hidden;
      }
    }
  }
</style>
