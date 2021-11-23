import "./App.css";
import React from "react";
import {Button, Card, Form} from "react-bootstrap";
import * as PropTypes from "prop-types";

function ToDo({
                  toDo,
                  removeToDo,
                  index,
                  markToDo
              }) {
    return (
        <div className="flex justify-between">
            <span style={{textDecoration: toDo.isDone ? "line-through" : ""}}>{toDo.text}</span>
            <div className="">
                <Button variant="outline-success" onClick={() => markToDo(index)}>✓</Button>
                <Button variant="outline-danger" onClick={() => removeToDo(index)}>x</Button>
            </div>
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
        <form onSubmit={handleSubmit}>
            <label>
                <h2>Add ToDo</h2>
                <input type="text" className="input" value={value}
                       onChange={e => setValue(e.target.value)}
                       placeholder="Add new todo"/>
            </label>
            <input className="bg-blue-100" type="submit" value="Add"/>
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
    const [toDos, setToDos] = React.useState([
        {
            text: "this is sample",
            isDone: false
        }]);

    const addToDo = text => {
        const newToDos = [...toDos, {text}];
        setToDos(newToDos);
    };

    const markToDoDone = index => {
        const newTodos = [...toDos];
        newTodos[index].isDone = !newTodos[index].isDone;
        setToDos(newTodos);
    };

    const removeToDo = index => {
        const newToDos = [...toDos];
        newToDos.splice(index, 1);
        setToDos(newToDos);
    };

    return (
        <div className="flex-col justify-center">
            <h1 className="text-pink-500 text-center">To do list</h1>
            <ToDoForm addToDo={addToDo}/>
            <div className>
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
