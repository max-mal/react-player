export function playerPlay(player, id, dispatch) {
  //console.log(playing);
  if (!player.media) return {type: false}
  if (player.playing) {
    player.media.pause();
    clearInterval(player.timer);
	 var iTimer = null;
  } else {
    player.media.play();
    if (player.timer)
    clearInterval(player.timer);
    // eslint-disable-next-line
    var iTimer = setInterval(() => {
      dispatch(playerGetCurrentTime(player.media.currentTime));
      dispatch({type: 'TRACK_SET_TIME', payload: {id, duration: player.media.duration, elapsed: player.media.currentTime}})
    }, 100)
  }

  return { type: 'TOGGLE', payload: { iTimer } }
}
export function playerInit(player, file, next = function(){}, id, dispatch) {
  if (player.media) { player.media.pause(); dispatch({type: 'STOP'}) }
  var media = new Audio(file);
  media.volume = player.volume
  media.addEventListener('canplaythrough', () => { dispatch(playerAfterInit(media.duration)); next()}, false);
  media.addEventListener('ended', () => {
  	dispatch({ type: 'STOP', })
  }, false);
  return { type: 'INIT', payload: { media, id } }

}
export function playerAfterInit(duration) {
  return { type: 'AFTER_INIT', payload: { duration } }
}

export function playerGetCurrentTime(time) {
  return { type: 'SET_TIME', payload: { time } }
}

export function playerProgressBarClick(context, position, media) {
	var pBar = document.getElementById('mainProgressBar')
	media.currentTime = (position.clientX - pBar.offsetLeft) * media.duration / pBar.offsetWidth
	//console.log(position.clientX - pBar.offsetLeft, pBar.offsetWidth, media.duration)
	return { type: 'SEEK', payload: { currentTime: media.currentTime } }
}

export function playerVolumeChange(position, media) {
	var pBar = document.getElementById('volumeProgressBar')
	var volume = (position.clientX - pBar.offsetLeft) / pBar.offsetWidth
	if (media)
		media.volume = volume
	return { type: 'VOLUME', payload: { volume: volume } }
}
export function playerSearch(e){
	//console.log(e.target.value);
	if (e.target.value.length < 3 && e.target.value.length > 0) 	return {type: false}
	return {type: 'SEARCH', payload: {text: e.target.value}}
}
