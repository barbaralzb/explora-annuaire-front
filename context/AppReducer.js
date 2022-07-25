export const initialState = null

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value
    }
  }
}
