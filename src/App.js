import "./App.css";
import React from "react";

function Card(props) {
    return <div>
        <h2>To do </h2>
        <p>test</p> {props.desc}</div>;
}

function App() {
    const [toDos, setTodos] = React.useState([{text: "this is sample", isDone: false}]);
    return (
        <div className="min-h-full">
            <h1 className="text-pink-500">To do list</h1>
            <input type="text"/>
            <button type="submit" className="bg-red">ADD</button>
        </div>
    );
}

const addToDo = text => {
    const newTodos = [...todos, {text}];
};

export default App;
