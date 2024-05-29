import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function App() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [record, setRecord] = useState([]);
  const [editId , seteditId] = useState("")

  useEffect(() => {
    const save = JSON.parse(localStorage.getItem('user')) || []
    setRecord(save)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !task) {
      alert("Please enter both name and task.");
      return false;
    }

      let obj = {
        id: Math.floor(Math.random() * 10000),
        name,
        task,
      };

      if(editId){
          let up = record.map((val) => {
            if(val.id == editId){
              val.name = name ,
              val.task = task
            }
            return val;
          })
        localStorage.setItem('user', JSON.stringify(up));
        setRecord(up);
        alert("Record updated...");
      }
      
      else{
        let all = [...record, obj];
        localStorage.setItem('user', JSON.stringify(all));
        setRecord(all);
        alert("Record added...");
      }
      setName("");
      setTask("");
      seteditId("")
  };

  const handleDelete = (id) => {
    let remove = record.filter((val) => val.id !== id);
    localStorage.setItem('user', JSON.stringify(remove));
    setRecord(remove);
    alert("Record deleted...");
  };

  const handleEdit = (val) => {
    setName(val.name || "")
    setTask(val.task || "")
    seteditId(val.id || "")
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 mx-auto">
          <div className="app rounded pt-3 pb-3">
            <h1 className='mb-3 text-left ms-1'>TODO App</h1>

            <form className='text-center' onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder='Add New Task'
                className=' border-0 px-3'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <textarea
                placeholder='Task Description'
                className=' border-0 px-3 mb-2'
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
              <div className="icon">
                <button className='bg-dark text-light' type="submit"><FaPlus /></button>
              </div>
            </form>

            <h2 className='text-center pt-3'>Tasks</h2>

            <div className="tasks-list">
              {
              record.map((val) => (
                <div className="task-box" key={val.id}>
                  <h4 className=' mx-3'>{val.name}</h4>
                  <h6 className='mx-3'>{val.task}</h6>
                  <div className="deleteIcon text-center">
                    <i onClick={() => handleEdit(val)}><FaEdit /></i>
                    <i onClick={() => handleDelete(val.id)}><RiDeleteBin6Fill /></i>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
