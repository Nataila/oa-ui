import { createStore } from 'redux'
import { rootReducer } from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configStore () {
  const store = createStore(
    rootReducer,
    composeWithDevTools()
  )
  return store
}
