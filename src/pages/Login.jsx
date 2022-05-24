import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import AppContext from "../context";

function Login() {
  const {user, setUser} = React.useContext(AppContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onRegistration = async (obj) => {
    try {
        axios.post("http://localhost:8088/login", obj)
        .then((res) => {
            setUser(res.data);
            localStorage.setItem('user', user);
            setMessage("");
        },
        ()=>{
            setMessage("Invalid login or password")
        }
        )
        
    } catch (error) {
      alert("Не удалось войти");
    }
  };

  return (

    <div className="content p-40">
        
        <h1> Войдите в аккаунт</h1>
        <div>

             <input
            required
            onChange={(obj)=> setEmail(obj.target.value)}
            value={email}
            type="email"
            placeholder="Ivanov@mail.ru"
             />
            <p></p>
             <input
            minLength={6}
            required
            onChange={(obj)=> setPassword(obj.target.value)}
            value={password}
            type="password"
            placeholder="Your password"
             />           
        </div>
            <p></p>
            <h1>{message && `${message}`}</h1>
            <div className="cu-p" onClick={() => onRegistration({email, password})}> <h2>Войти</h2> </div>
            <h3>Ещё не зарегистрированы?</h3><Link to="/registration"><h3> Зарегистрироваться</h3></Link>
          
    </div>
  );
}

export default Login;
