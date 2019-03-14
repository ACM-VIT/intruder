import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './App'
import reducers from './reducers'

export default ()=>{
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
            <App/>
        </Provider>
        )
}