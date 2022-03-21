export const playModeMap = {
  sequence: {
    code: 'sequence',
    icon: 'sequence',
    name: '顺序播放',
  },
  loop: {
    code: 'loop',
    icon: 'loop',
    name: '单曲循环',
  },
  random: {
    code: 'random',
    icon: 'random',
    name: '随机播放',
  },
}

// 存储播放中的歌曲
export const PLAY_SONG_KEY = '__play_song__'

// 存储播放模式
export const PLAY_MODE_KEY = '__play_mode__'

// 存储播放列表
export const PLAY_LIST_KEY = '__play_list__'

// 存储播放记录
export const PLAY_HISTORY_KEY = '__play_history__'

// 用户id
export const UID_KEY = '__uid__'

// 登录后返回的cookie
export const COOKIE_KEY = '__cookie__'

// 音量
export const VOLUME_KEY = '__volume__'
