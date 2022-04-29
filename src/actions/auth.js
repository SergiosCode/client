import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export const signin = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};



export const signup = (formData, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};


