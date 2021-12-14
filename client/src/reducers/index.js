import { combineReducers } from 'redux';

import {authReducers} from './auth';
import blogReducers from './blogs';
import {userReducers} from './user'
import discussion from './discussion'
import comments from './comments';

export const reducers = combineReducers({
    authReducers,userReducers,blogReducers,discussion,comments
}); 