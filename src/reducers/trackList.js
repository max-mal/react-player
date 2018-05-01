const initialState = {
  tracks : [{
    artist: 'Artist 1',
    track: 'TrackName',
    path: 'http://5.79.83.8/sdd/3e/53/91/165926634_456240050.mp3?cdnredir=1',
    duration: 0,
    elapsed: 0,
    visible: true,
  },
  {
    artist: 'Artist 2',
    track: 'TrackName2',
    path: 'http://5.79.83.8/sdi/77/7d/83/7846058_114929855.mp3?cdnredir=1',
    duration: 0,
    elapsed: 0,
    visible: true,
  }],
  currentTrack: -1,
}

const trackList = (state = initialState, action) => {
  switch (action.type) {
    case 'TRACK_INIT':
      return {...state, currentTrack: action.payload.id}
    case 'TRACK_SET_TIME':
      //console.log(state)
      var newState = Object.assign({}, state);
      newState.tracks[action.payload.id].duration = action.payload.duration;
      newState.tracks[action.payload.id].elapsed = action.payload.elapsed;
     return newState
    case 'SEARCH':
      // eslint-disable-next-line
      var newState = Object.assign({}, state);
      newState.tracks.forEach((track)=>{
        var r = new RegExp('^' + action.payload.text);
        if (r.exec(track.artist) || r.exec(track.track)) { track.visible = true } else { track.visible = false }
      })
      return newState
    default:
      return state
  }
}

export default trackList
