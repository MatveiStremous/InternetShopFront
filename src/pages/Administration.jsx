import React from "react";
import axios from "axios";

function Administration() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const answer = await axios.get(`http://localhost:8088/getAllUsers`);
        setUsers(answer.data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const onUpStatus = async (obj) => {
    try {
      if (obj.role === "MODERATOR_ROLE") {
        alert("Запрещено повышать до Администратора.");
      } else {
        await axios.post(`http://localhost:8088/upStatus/${obj.id}`);
      }
    } catch (error) {
      alert("Не удалось увеличить статус пользователю");
    }
  };

  const onDownStatus = async (obj) => {
    try {
      console.log(obj.role);
      if (obj.role === "ADMIN_ROLE") {
        alert("Запрещено понижать администраторов.");
      } else {
        if (obj.active === false) {
          alert("Ниже некуда...");
        } else {
          await axios.post(`http://localhost:8088/downStatus/${obj.id}`);
        }
      }
    } catch (error) {
      alert("Не удалось снизить статус пользователю");
    }
  };

  return (
    <div className="p-40">
      {users.map((obj) => (
        <div key={obj.id} className="d-flex align-center mb-20">
          <h3>
            {obj.id}, {obj.email}, {obj.name}, {obj.active ? obj.role : "BLOCKED"}
          </h3>
          <img
            className="ml-20 cu-p"
            onClick={() => onUpStatus(obj)}
            width={30}
            height={30}
            src="./img/up.png"
            alt="up"
          />

          <img
            className="ml-20 cu-p"
            onClick={() => onDownStatus(obj)}
            width={30}
            height={30}
            src="./img/down.png"
            alt="down"
          />
        </div>
      ))}
    </div>
  );
}

export default Administration;
