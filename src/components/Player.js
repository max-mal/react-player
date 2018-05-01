import React from 'react'
import { playerPlay, playerInit, playerProgressBarClick, playerVolumeChange } from '../actions'
import { connect } from 'react-redux'

class Player extends React.Component {
  
  render() {
    const minutesElapsed = Math.trunc(Math.ceil(this.props.player.currentTime) / 60)
    const secondsElapsed = Math.ceil(this.props.player.currentTime) - minutesElapsed * 60
    const minutesTotal = Math.trunc(Math.ceil(this.props.player.duration) / 60)
    const secondsTotal = Math.ceil(this.props.player.duration) - minutesTotal * 60
    if (this.props.player.duration === this.props.player.currentTime) {
      clearInterval(this.props.player.timer)
    }
    return  (
      <div id="player-inner">
        <button onClick={()=>{
          let id
          if (this.props.player.currentTrackId - 1 >= 0) { id = this.props.player.currentTrackId - 1 } else {
            id = this.props.trackList.tracks.length - 1
          }
          this.props.onPrevNextClick(this.props.player, this.props.trackList.tracks[id].path, id, ()=> { this.props.onPlayClick(this.props.player, id) })
        }}><i className="fas fa-step-backward"></i></button> 
        <button disabled={this.props.player.stop} onClick={() => this.props.onPlayClick(this.props.player, this.props.player.currentTrackId)}>{this.props.player.playing? (<i class="fas fa-pause"></i>) : (<i className="fas fa-play"></i>)}</button>
        <button onClick={()=>{
          let id
          if (this.props.player.currentTrackId + 1 < this.props.trackList.tracks.length) { id = this.props.player.currentTrackId + 1 } else {
            id = 0
          }
          this.props.onPrevNextClick(this.props.player, this.props.trackList.tracks[id].path, id, ()=> { this.props.onPlayClick(this.props.player, id) })
        }}><i className="fas fa-step-forward"></i></button>
        <progress id="mainProgressBar" onClick={(e) => this.props.onProgressBarClick(this, e, this.props.player)} value={this.props.player.currentTime} max={this.props.player.duration}></progress> 
        <p>{minutesElapsed}:{(secondsElapsed < 10)? '0': ''}{secondsElapsed} / {minutesTotal}:{(secondsTotal < 10)? '0': ''}{secondsTotal}</p>
        <progress id="volumeProgressBar" onClick={(e) => this.props.onVolumeProgressBarClick(e, this.props.player.media)} value={this.props.player.volume} max={1}></progress> 
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPlayClick: (state, id) => dispatch(playerPlay(state, id, dispatch)),
  onInit: (file) => dispatch(playerInit(file, dispatch, 0)),
  onProgressBarClick: (context, position, player) => { dispatch(playerProgressBarClick(context, position, player.media));  dispatch(playerPlay(player, player.currentTrackId, dispatch))},
  onVolumeProgressBarClick: (position, media) => dispatch(playerVolumeChange(position, media)),

  onPrevNextClick: (player, file, id, next) => {dispatch(playerInit(player, file, next, id, dispatch)); dispatch({type: 'TRACK_INIT', payload: {id}})},
})
function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
//export default Player