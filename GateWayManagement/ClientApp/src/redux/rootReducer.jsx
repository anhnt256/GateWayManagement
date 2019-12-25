import { combineReducers } from 'redux';
import settingReducer from '../general/Setting/reducers';
import authReducer from '../general/Auth/reducers';
import gameReducer from '../routes/main/dashboard/Event/reducers';
import gameResultReducer from '../routes/main/dashboard/Event/components/games/WinWheel/reducers';

const rootReducer = combineReducers({
  settings: settingReducer,
  auth: authReducer,
  game: gameReducer,
  gameResult: gameResultReducer,
});

export default rootReducer;
