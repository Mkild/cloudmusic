import storage from 'good-storage'
import { PLAY_SONG_KEY, PLAY_MODE_KEY, PLAY_LIST_KEY, PLAY_HISTORY_KEY } from '@/utils'
import { playModeMap } from '@/utils/config'

export default {
  // 当前播放歌曲
  currentSong: storage.get(PLAY_SONG_KEY, {}),
  // 当前播放时长
  currentTime: 0,
  // 播放状态
  playing: false,
  // 播放模式
  playMode: storage.get(PLAY_MODE_KEY, playModeMap.sequence.code),
  // 播放列表显示
  isPlaylistShow: false,
  // 播放提示显示
  isPlaylistPromptShow: false,
  // 歌曲详情页显示
  isPlayerShow: false,
  // 播放列表数据
  playlist: storage.get(PLAY_LIST_KEY, []),
  // 播放历史数据
  playHistory: storage.get(PLAY_HISTORY_KEY, []),
  // 菜单显示
  isMenuShow: true,
  // 标题滚动开关
  isMarqueeOpen: true,
  // 输入框焦点
  isInputFocus: false,
  // 进度条鼠标按下
  isProgressDown: false,
}
