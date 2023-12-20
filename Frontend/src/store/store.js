import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/user.reducer'
import { movieReducer } from './reducers/movie.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    userModule: userReducer,
    movieModule: movieReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store