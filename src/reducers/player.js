const initialState = {
  playing: false,
  media: null,
  duration: 0,
  currentTime: 0,
  timer: null,
  volume: 1,
  currentTrackId: -1,
  stop: true,
}

const player = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {...state, playing: !state.playing, timer: action.payload.iTimer, stop: false}
    case 'INIT':
      return {...state, media: action.payload.media, duration: action.payload.duration, currentTime: 0, currentTrackId: action.payload.id, stop: false,}
    case 'AFTER_INIT':
      return {...state, duration: action.payload.duration}
    case 'SET_TIME':
      return {...state, currentTime: action.payload.time}
    case 'SEEK':
      return {...state, currentTime: action.payload.currentTime}
    case 'VOLUME':
      return {...state, volume: action.payload.volume}
    case 'STOP':
      return {...state, playing: false, stop: true, }
    default:
      return state
  }
}

export default player
