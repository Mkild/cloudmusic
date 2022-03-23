<script>
  import ElTable from 'element-ui/lib/table'
  import { confirm } from '@/base/confirm'
  import { mapMutations, mapActions, mapState } from '@/store/helper/music'
  import { mapGetters as userMapGetters } from '@/store/helper/user'
  import { pad, goMvWithCheck } from '@/utils'

  export default {
    name: 'SongTable',
    props: {
      showHeader: {
        type: Boolean,
        default: true,
      },
      hideColumns: {
        type: Array,
        default: () => [],
      },
      songs: {
        type: Array,
        default: () => [],
      },
      artistsWidth: {
        type: Number,
        default: 110,
      },
      highlightText: {
        type: String,
        default: '',
      },

      // 名字下面渲染的额外内容
      renderNameDesc: {
        type: Function,
      },
    },
    data() {
      const commonHighLightSlotScopes = {
        default: (scope) => {
          const text = scope.row[scope.column.property]
          if (scope.row.vip !== 1 && scope.row.fl === 0) {
            return <HighlightText class="song-table-name-ban" text={text} highlightText={this.highlightText} />
          } else {
            return <HighlightText class="song-table-name" text={text} highlightText={this.highlightText} />
          }
        },
      }
      return {
        columns: [
          {
            prop: 'index',
            label: '',
            width: '70',
            scopedSlots: {
              default: (scope) => {
                return (
                  <div class="index-wrap">
                    {this.isActiveSong(scope.row) ? (
                      <Icon class="horn" type="horn" color="theme" />
                    ) : (
                      // 补上左边的0
                      <span>{pad(scope.$index + 1)}</span>
                    )}
                  </div>
                )
              },
            },
          },
          {
            prop: 'img',
            label: ' ',
            width: '100',
            scopedSlots: {
              default: (scope) => {
                return (
                  <div class="img-wrap">
                    <img v-lazy={this.$utils.genImgUrl(scope.row.img, 120)} />
                    <PlayIcon class="play-icon" />
                  </div>
                )
              },
            },
          },
          {
            prop: 'name',
            label: '标题',
            className: 'title-td',
            scopedSlots: {
              default: (scope) => {
                const {
                  row: { name, alia, vip, mvId, fl, playMaxbr },
                } = scope

                const onGoMv = async (e) => {
                  e.stopPropagation()
                  goMvWithCheck(mvId)
                }

                let title = name
                let alias = alia
                if (alia && alia.length !== 0) {
                  title = `${name} (${alia})`
                } else {
                  alias = ''
                }

                return (
                  <div>
                    <div class="song-table-name-cell">
                      <div class="song-table-title" title={title}>
                        {commonHighLightSlotScopes.default(scope)}
                        {(alias && fl) || (vip === 1 && alias) ? <span class="alia">({alias})</span> : null}
                      </div>
                      {vip !== 1 && alias && !fl ? <span class="alia-ban">({alias})</span> : null}
                      {vip === 1 ? <Icon class="vip-icon" type="vip" color="red" size={20} /> : null}
                      {playMaxbr === 320000 && fl ? <Icon class="hq-icon" type="hq" color="theme" size={20} /> : null}
                      {playMaxbr === 999000 && fl ? <Icon class="sq-icon" type="sq" color="theme" size={22} /> : null}
                      {mvId ? <Icon class="mv-icon" onClick={onGoMv} type="mv01" color="theme" size={18} /> : null}
                    </div>

                    {this.renderNameDesc ? this.renderNameDesc(scope) : null}
                  </div>
                )
              },
            },
          },
          {
            prop: 'artistsText',
            label: '歌手',
            width: +this.artistsWidth,
            scopedSlots: commonHighLightSlotScopes,
          },
          {
            prop: 'albumName',
            label: '专辑',
            width: '300',
            scopedSlots: {
              default: (scope) => {
                const {
                  row: { albumName },
                } = scope
                if (albumName !== '') {
                  return commonHighLightSlotScopes.default(scope)
                } else {
                  return '未知专辑'
                }
              },
            },
          },
          {
            prop: 'durationSecond',
            label: '时长',
            width: '100',
            scopedSlots: {
              default: (scope) => {
                return <span class="song-table-time">{this.$utils.formatTime(scope.row.durationSecond)}</span>
              },
            },
          },
        ],
      }
    },
    methods: {
      async onRowClick(song) {
        if (song.vip == 1 && !this.isVip) {
          confirm('你还不是会员，开通会员后再来吧~', '该歌曲为VIP专享')
          return
        }
        this.startSong(song)
        this.setPlaylist(this.songs)
      },
      isActiveSong(song) {
        return song.id === this.currentSong.id
      },
      tableCellClassName(args) {
        const { row, columnIndex } = args
        const cellClassNameProp = this.$attrs.cellClassName

        let retCls = []
        // 执行外部传入的方法
        if (cellClassNameProp) {
          const propRet = cellClassNameProp(args)
          if (propRet) {
            retCls.push(propRet)
          }
        }
        if (this.isActiveSong(row) && columnIndex === this.showColumns.findIndex(({ prop }) => prop === 'name')) {
          retCls.push('song-active')
        }
        return retCls.join(' ')
      },
      ...mapMutations(['setPlaylist']),
      ...mapActions(['startSong']),
    },
    computed: {
      showColumns() {
        const hideColumns = this.hideColumns.slice()
        const reference = this.songs[0]
        const { img } = reference
        if (!img) {
          hideColumns.push('img')
        }
        return this.columns.filter((column) => {
          return !hideColumns.find((hideColumn) => hideColumn === column.prop)
        })
      },
      ...mapState(['currentSong']),
      ...userMapGetters(['isVip']),
    },
    render() {
      const elTableProps = ElTable.props
      // 从$attrs里提取作为prop的值
      const { props, attrs } = genPropsAndAttrs(this.$attrs, elTableProps)
      const tableAttrs = {
        attrs,
        on: {
          ...this.$listeners,
          ['row-click']: this.onRowClick,
        },
        props: {
          ...props,
          cellClassName: this.tableCellClassName,
          headerCellClassName: 'title-th',
          showHeader: this.showHeader,
          stripe: true,
          data: this.songs,
        },
        style: { width: '99.9%' },
      }
      return this.songs.length ? (
        <el-table class="song-table" {...tableAttrs}>
          {this.showColumns.map((column, index) => {
            const { scopedSlots, ...columnProps } = column
            return <el-table-column key={index} props={columnProps} scopedSlots={scopedSlots}></el-table-column>
          })}
        </el-table> // eslint-disable-next-line vue/script-indent
      ) : null
    },
  }

  function genPropsAndAttrs(rawAttrs, componentProps) {
    const props = {}
    const attrs = {}
    Object.keys(rawAttrs).forEach((key) => {
      const value = rawAttrs[key]
      if (componentProps.Object.prototype.hasOwnProperty.call(key)) {
        props[key] = value
      } else {
        attrs[key] = value
      }
    })
    return { props, attrs }
  }
</script>

<style lang="scss">
  .song-table {
    .title-th {
      color: $font-color-grey2;
      font-weight: normal;
    }

    .title-td {
      color: $font-color-gray;
    }

    .padding-space {
      padding-left: 24px;
    }

    .song-active {
      color: $theme-color !important;

      .high-light-text {
        color: $theme-color;
      }
    }

    .index-wrap {
      text-align: center;
      color: $font-color-grey-shallow;
    }

    .img-wrap {
      position: relative;
      @include img-wrap(60px);

      img {
        border-radius: 4px;
      }
      .play-icon {
        @include abs-center;
      }
    }
    .high-light-text {
      color: $blue;
    }

    .song-table-name-cell {
      @include text-ellipsis;
      display: flex;
      align-items: center;

      .song-table-title {
        @include text-ellipsis;
      }

      .song-table-name {
        flex-shrink: 1;
        @include text-ellipsis;
        cursor: default;
      }

      .song-table-name-ban {
        color: $font-color-ban;
        flex-shrink: 1;
        @include text-ellipsis;
        cursor: default;
      }

      .alia {
        margin-left: 4px;
        color: $font-color-gray-shallow;
        flex-shrink: 10000;
        @include text-ellipsis;
        cursor: default;
      }

      .alia-ban {
        margin-left: 4px;
        color: $font-color-ban;
        flex-shrink: 10000;
        @include text-ellipsis;
        cursor: default;
      }

      .vip-icon {
        margin-left: 4px;
        cursor: default;
      }

      .hq-icon {
        margin-left: 4px;
        cursor: default;
      }

      .sq-icon {
        margin-left: 4px;
        cursor: default;
      }

      .mv-icon {
        margin-left: 4px;

        &:hover {
          text-shadow: 0 0 0.6px #c875ff;
        }
      }
    }

    .song-table-name {
      cursor: pointer;
    }
  }
</style>
