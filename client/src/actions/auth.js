

import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from "react-redux";

export const signup = (formData, navigate) => async (dispatch) => {
      // const navigate = useNavigate()
      // const dispatch = useDispatch();
      try {
      // sign up the user
            const { data } = await api.signUp(formData);

            dispatch({ type: AUTH, data });
            navigate('/');

      }   catch (error)   {
            console.log("Error at auth actions",error);

      }
};

export const signin = (formData, navigate) => async (dispatch) => {
      // const navigate = useNavigate()

      try { 
            // login the user
            const { data } = await api.signIn(formData);

            dispatch({ type: AUTH, data });
            navigate('/');
            
      }   catch (error)   {
            console.log("Error at auth actions",error);
      }
};
