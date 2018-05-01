import React from 'react'
import { playerInit, playerPlay, playerSearch } from '../actions'
import { connect } from 'react-redux'
import Track from './Track'

class TrackList extends React.Component {
  
  render() {
    var context = this;
    return (
      <div id="trackList-inner">
      <input type="text" id="search" placeholder="Enter artist or track name" onKeyUp={(e)=>this.props.onSearchChange(e)}/>
          {this.props.trackList.tracks.map((track, i) =>  (<Track visible={track.visible} elapsed={track.elapsed} duration={track.duration} artist={track.artist} track={track.track} 
            onClick={() => {
              (context.props.trackList.currentTrack !== i || context.props.player.stop) ?
              this.props.onTrackClick(this.props.player, track.path, i, ()=> { this.props.onPlayTrackClick(this.props.player, i) }) : 
              this.props.onPlayTrackClick(this.props.player, i)
            }} />))}
      </div>
      )
    
  }
  
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTrackClick: (player, file, id, next) => {dispatch(playerInit(player, file, next, id, dispatch)); dispatch({type: 'TRACK_INIT', payload: {id}})},
  onPlayTrackClick: (state, id) =>{console.log('TRACK_PLAY_PAUSE'); dispatch(playerPlay(state, id, dispatch))},
  onSearchChange: (e)=>dispatch(playerSearch(e)),
})
function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)