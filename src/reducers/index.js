import { combineReducers } from 'redux'
import player from './player'
import trackList from './trackList'


export default combineReducers({
  player, trackList,
})
