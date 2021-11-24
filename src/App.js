import "./App.css";
import React from "react";
import {Button, Card} from "react-bootstrap";
import * as PropTypes from "prop-types";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyaPzzqcQNx0AMffKzPiQHgYvTveZ4PC4",
    authDomain: "todo-app-b179d.firebaseapp.com",
    projectId: "todo-app-b179d",
    storageBucket: "todo-app-b179d.appspot.com",
    messagingSenderId: "565529030621",
    appId: "1:565529030621:web:ccfde6e68dca0e62859034",
    measurementId: "G-Z6J17S6QTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function ToDo({
                  toDo,
                  removeToDo,
                  index,
                  markToDo
              }) {
    return (
        <div className="my-2">
            <span className="px-2" style={{textDecoration: toDo.isDone ? "line-through" : ""}}>{toDo.text}</span>
            <span className="float-right">
                <Button className="px-2" onClick={() => markToDo(index)}>✓</Button>
                <Button className="px-2" variant="outline-danger" onClick={() => removeToDo(index)}>x</Button>
            </span>
        </div>);
}

function ToDoForm({addToDo}) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;

        addToDo(value);
        setValue("");
    };

    return (
        <form className="px-2" onSubmit={handleSubmit}>
                <input className="border-1 border-blue-100" type="text" value={value}
                       onChange={e => setValue(e.target.value)}
                       placeholder="Add new todo"/>
            <input className="bg-blue-100 float-right px-2" type="submit" value="Add"/>
        </form>
    );
}

ToDo.propTypes = {
    toDo: PropTypes.shape({
        text: PropTypes.string,
        isDone: PropTypes.bool
    }),
    removeToDo: PropTypes.func,
    index: PropTypes.number,
    markToDo: PropTypes.func
};

function App() {
    let storedList = JSON.parse(localStorage.getItem('list'))
    if (!storedList) storedList = [];
    const [toDos, setToDos] = React.useState(storedList);

    const addToDo = text => {
        const newToDos = [...toDos, {text}];
        setToDos(newToDos);
        localStorage.setItem('list', JSON.stringify(newToDos))
    };

    const markToDoDone = index => {
        const newToDos = [...toDos];
        newToDos[index].isDone = !newToDos[index].isDone;
        setToDos(newToDos);
        localStorage.setItem('list', JSON.stringify(newToDos))
    };

    const removeToDo = index => {
        const newToDos = [...toDos];
        newToDos.splice(index, 1);
        setToDos(newToDos);
        localStorage.setItem('list', JSON.stringify(newToDos))
    };

    return (
        <div>
            <h1 className="text-pink-500 text-center font-roboto">To do list</h1>
            <ToDoForm addToDo={addToDo}/>
            <div>
                {toDos.map((toDo, index) => {
                    return (<Card>
                        <Card.Body>
                            <ToDo key={index} index={index} toDo={toDo} markToDo={markToDoDone}
                                  removeToDo={removeToDo}/>
                        </Card.Body>
                    </Card>);
                })}
            </div>
        </div>
    );
}

export default App;
