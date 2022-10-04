import { LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    CLEAR_ERRORS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
}
from "../constants/userConstant"


export const userReducer=(state={user:[]},action)=>
{
    switch(action.type){
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false
        }
        case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload
        }

        case LOGOUT_SUCCESS:
            return{
                isAuthenticated:false,
                user:null,
                loading:false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false, 
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading:false, 
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        }
        default:
            return state;
    }
}


export const profileReducer=(state={},action)=>
{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                isUpdated:action.payload
            };
        case UPDATE_PROFILE_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            };
        case UPDATE_PROFILE_RESET:
            return{
                ...state,
                isUpdated:false
            };
        case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        };
        default:
            return state;
    }
}