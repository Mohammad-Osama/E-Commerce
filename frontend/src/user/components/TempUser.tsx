
import { useSelector } from "react-redux"
import { authState,logout } from "../redux/slices/authSlice"
import { AppDispatch } from "../redux/store"
import { useDispatch } from 'react-redux';


export default function TempUser() {
    const dispatch = useDispatch<AppDispatch>()


    const { id, first_name, last_name, role, email, message, isError } = useSelector(authState)
    return (
        <div>
            <div>user</div>
            <div>id : {id}</div>
            <div>role : {role}</div>
            <div>first name : {first_name}</div>
            <div>last name : {last_name}</div>
            <div>email : {email}</div>
            <div>message : {message}</div>
            <div>isError : {isError}</div>
            <button onClick={() => dispatch(logout())}>logout</button>
        </div>
    )
}
