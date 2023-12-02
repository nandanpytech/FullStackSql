import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";

function Home() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("Email"));
  const [userName,setUserName]=useState("")
  const navigate=useNavigate()

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setTodos(response?.data);
  };

  const loadUserName=()=>{
    axios.post("http://localhost:5000/api/getuser",{userEmail}).then((res)=>{
      setUserName(res?.data[0].name)
      console.log(res);
    })
    .catch((err)=>{
      localStorage.removeItem("Token")
      localStorage.removeItem("Email")
      navigate("/")
    })
  }

  useEffect(() => {
    loadData();
    loadUserName();
  }, []);

  const addNewTodo = (e) => {
    e.preventDefault();
    if (!todoInput) {
      console.log("jjo");
    } else {
      axios
        .post("http://localhost:5000/api/post", { todoInput, userEmail })
        .then((res) => {
          setTodoInput("");
          loadData();
          toast["success"](res, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const deletTodo = (id) => {
    axios.delete(`http://localhost:5000/api/delete/${id}`).then((res) => {
      toast["success"](res, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      loadData();
    });
  };

  const MarkDone = (isCompleted, id) => {
    const status = !isCompleted;
    axios
      .post("http://localhost:5000/api/update", { status, id })
      .then((res) => {
        toast["success"](res, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        loadData();
      });
  };

  console.log(userName);

  return (
    <>
      <LogOut />
      <h1 style={{textAlign:"center"}}>{userName}</h1>
      <div className="wrapper">
        <header>Todo App</header>
        <div className="inputField">
          <input
            type="text"
            placeholder="Add your new todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button onClick={(e) => addNewTodo(e)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <ul className="todoList">
          {todos.map((e, index) => {
            console.log(e.email===userEmail);
            return e.email === userEmail && (
            <div className="listoftodo">
                <li
                  style={{
                    color: `${e.isCompleted ? "green" : ""}`,
                    fontWeight: `${e.isCompleted ? "600" : ""}`,
                  }}
                >
                  {e?.name}
                </li>
                <div>
                  <span onClick={() => deletTodo(e.id)} className="delet">
                    Delete
                  </span>
                  <span
                    onClick={() => MarkDone(e.isCompleted, e.id)}
                    className="done"
                  >
                    {e.isCompleted ? "Not Done" : "Done"}
                  </span>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
