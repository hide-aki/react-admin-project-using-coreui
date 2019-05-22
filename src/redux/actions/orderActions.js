import axios from "axios";
import { GET_ORDER_USER,GET_ORDER_LOCATION,ORDER_UPDATE,RESET_UPDATE_STATUS,RESET_ORDERS,ORDER_UPDATE_BY_OPTIONS,RESET_UPDATED_OPTIONS } from "./types";
import { Constants } from "../../constants/environment";
import Auth from '../../cookie/Auth.js';

export const getOrderByUser = () => dispatch => {   
  let config = {
    headers: {
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }  
  axios
    .get(
      Constants.BASE_URL +
        'api/orders/user/'+Auth.getToken('userId'),config
    )
    .then(result =>{   
        return dispatch({
          type: GET_ORDER_USER,
          payload: result.data        
        })
    }
      
    );
};

export const getOrderByLocation = () => dispatch => { 
  
  let locationId=Auth.getToken('locationId');
  let config = {
    headers: {
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }  
  axios
    .get(
      Constants.BASE_URL +
        'api/orders/location/'+locationId,config
    )
    .then(result =>{      
        return dispatch({
          type: GET_ORDER_LOCATION,
          payload: result.data        
        })
    }
      
    )
	.catch(function(error) {
		return dispatch({
          type: GET_ORDER_LOCATION,
          payload: []        
        })      
    });
};

export const orderUpdate = postData => dispatch => {  
  axios
    .put(Constants.BASE_URL + 'api/orders/'+postData.id, postData, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(result =>{     
      return dispatch({
        type: ORDER_UPDATE,
        payload: result
      })
    }
      
    )
    .catch(function(error) {
      console.log("ERROR", error);
    });
};


export const orderUpdateByOption = postData => dispatch => {  
  axios
    .put(Constants.BASE_URL + 'api/orders/'+postData.id+'/options', postData, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(result =>{ 
      return dispatch({
        type: ORDER_UPDATE_BY_OPTIONS,
        payload: result
      })
    }
      
    )
    .catch(function(error) {
      console.log("ERROR", error);
    });
};

export const resetUpdatedOrder = ()=> dispatch => {    
      return dispatch({
        type: RESET_UPDATE_STATUS,
        payload: []
      })   
};

export const resetUpdatedOptions = ()=> dispatch => {    
  return dispatch({
    type: RESET_UPDATED_OPTIONS,
    payload: []
  })   
};


export const resetOrders = ()=> dispatch => {
    
  return dispatch({
    type: RESET_ORDERS,
    payload: []
  })

};

