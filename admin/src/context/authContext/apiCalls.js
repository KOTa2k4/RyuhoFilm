import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./AuthAction"

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data))
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}