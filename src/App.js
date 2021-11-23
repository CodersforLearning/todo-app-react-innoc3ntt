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
    return <div className="toDo">
        <span>{toDo.text}</span>
        <div>
            <Button variant="outline-success" onClick={() => markToDo(index)}>✓</Button>
            <Button variant="outline-danger" onClick={() => removeToDo(index)}>x</Button>
        </div>
    </div>;
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
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Add ToDo</Form.Label>
                    <Form.Control type="text" className="input" value={value}
                                  onChange={e => setValue(e.target.value)}
                                  placeholder="Add new todo"/>
                </Form.Group>
                <Button variant="light" type="submit">Submit</Button>
            </Form>
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

    //ToDo add a toggle handler for isDone state

    const addToDo = text => {
        const newToDos = [...toDos, {text}];
        setToDos(newToDos);
    };

    const markToDoDone = index => {
        const newTodos = [...toDos];
        newTodos[index].isDone = true;
        setToDos(newTodos);
    };

    const removeToDo = index => {
        const newToDos = [...toDos];
        newToDos.splice(index, 1);
        setToDos(newToDos);
    };

    return (
        <div className="min-h-full">
            <h1 className="text-pink-500">To do list</h1>
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
