import _ from 'lodash';

const initialState = {
  posts: [],
};

const SET_USER_POSTS = 'USER_POSTS';
const INSERT_USER_POSTS = 'INSERT_USER_POSTS';

const userReducer = (state = initialState, action) => {
  const tempState = _.assign({}, state);
  switch (action.type) {
    case SET_USER_POSTS:
      tempState.posts = action.payload;
      return tempState;
    case INSERT_USER_POSTS:
      const arr = [...tempState.posts]
      arr.unshift(action.payload);
      tempState.posts = arr;
      return tempState;
    default:
      return tempState;
  }
};
export default userReducer;

