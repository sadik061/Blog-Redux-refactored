import _ from 'lodash';
import jsanoPlaceholder from '../apis/jasonPlaceholder';


export const fetchPostAndUsers = () => async (dispatch, getState) => 
{
    await dispatch(fetchPost());
    const userIds = _.uniq(_.map(getState().post, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));

    // _.chain(getState().post)
    // .map('userId')
    // .uniq()
    // .forEach(id => dispatch(fetchUser(id)))
    // .value()

} 

export const fetchPost = () => async (dispatch) => {
    const response = await jsanoPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser =(id) => async (dispatch) => {
    const response = await jsanoPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
};