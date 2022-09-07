import { combineReducers } from 'redux';
import { music } from './redux/player.redux';
const rootReducer = combineReducers({
    music
});
export default rootReducer