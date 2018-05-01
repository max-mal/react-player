import React from 'react'
import { connect } from 'react-redux'

class Track extends React.Component {
  
  render() {
    const minutesElapsed = Math.trunc(Math.ceil(this.props.elapsed) / 60)
    const secondsElapsed = Math.ceil(this.props.elapsed) - minutesElapsed * 60
    return  (
      <div className="track-inner" onClick={this.props.onClick} style={this.props.visible? {display: 'block'}:{display: 'none'}}>
       <progress value={this.props.elapsed} max={this.props.duration}></progress> 
         <p className="trackName">{this.props.artist} - {this.props.track}</p>
         <p className="trackDuration">{minutesElapsed}:{(secondsElapsed < 10)? '0': ''}{secondsElapsed}</p>
      </div>
    )
  }
  
}

const mapDispatchToProps = (dispatch, ownProps) => ({})
function mapStateToProps (state) {
  return state.trackList
}

export default connect(mapStateToProps, mapDispatchToProps)(Track)