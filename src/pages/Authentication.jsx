import React from "react";
//import axios from "axios";

function Authentication({onChangeInput}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");

  const newUser={
    name: name,
    email: email,
    password: password,
    password2: password,
  };

  const onRegistration = async (obj) => {
    try {
        if(password === password2){
            //await axios.post(`https://localhost:8088/registration`, obj);
            console.log(obj);
        }
        else{
            setMessage("Пароли не совпадают!");
        }
    } catch (error) {
      alert("Не удалось зарегистрироваться");
    }
  };

  return (

    <div className="content p-40">
        <div>
            <input class
            required
            onChange={(obj)=> setName(obj.target.value)}
            value={newUser.name}
            placeholder="Иван"
             />
<p></p>
             <input
            required
            onChange={(obj)=> setEmail(obj.target.value)}
            value={newUser.email}
            type="email"
            placeholder="Ivanov@mail.ru"
             />
<p></p>
             <input
            minLength={6}
            required
            onChange={(obj)=> setPassword(obj.target.value)}
            value={newUser.password}
            type="password"
            placeholder="Your password"
             />
<p></p>
            <input
            minLength={6}
            required
            onChange={(obj)=> setPassword2(obj.target.value)}
            value={password2}
            type="password"
            placeholder="Enter your password one more time"
             />
        </div>
<p></p>
            <h1>{message && `${message}`}</h1>
            <div className="cu-p" onClick={() => onRegistration(newUser)}>
                <h3>Зарегистрироваться</h3>
            </div>
    </div>
  );
}

export default Authentication;
