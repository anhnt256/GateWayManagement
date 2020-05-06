import { combineReducers } from 'redux';
import settingReducer from '../general/Setting/reducers';
import authReducer from '../general/Auth/reducers';
import gameReducer from '../routes/main/dashboard/Event/reducers';
import gameResultReducer from '../routes/main/dashboard/Event/components/games/WinWheel/reducers';
import recipeReducer from '../routes/main/dashboard/Order/reducers';
import OrderReducer from '../routes/main/dashboard/OrderProcessing/reducers';

const rootReducer = combineReducers({
  settings: settingReducer,
  auth: authReducer,
  game: gameReducer,
  gameResult: gameResultReducer,
  recipe: recipeReducer,
  order: OrderReducer,
});

export default rootReducer;
