import "./App.css";
import React from "react";
import {Button, Card} from "react-bootstrap";
import * as PropTypes from "prop-types";

function ToDo({
                  toDo,
                  removeToDo,
                  index,
                  markToDo
              }) {
    return <div className="toDo"><span>{toDo.text}</span></div>;
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
            <div>
                {toDos.map((toDo, index) => {
                    return (<Card>
                        <Card.Body>
                            <ToDo key={index} index={index} toDo={toDo} markToDo={markToDoDone}
                                  removeToDo={removeToDo}/>
                            <Card.Text>TEST</Card.Text>
                        </Card.Body>
                    </Card>);
                })}
                <button type="submit" className="bg-red">ADD</button>
            </div>
        </div>
    );
}

export default App;
