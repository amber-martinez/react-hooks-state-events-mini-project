import React, {useState} from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

import { CATEGORIES, TASKS } from "../data";
// console.log("Here's the data you're working with");
// console.log({ CATEGORIES, TASKS });

function App() {

  const [tasks, setTasks] = useState(TASKS)

  function onTaskFormSubmit(newTask) {
    console.log('this was submitted')
    const newTaskSubmit = [...tasks, newTask]
    setTasks(newTaskSubmit)
  }

  function handleDelete(task) {
    let thingToDelete = task.target.previousSibling.textContent
    const removeTask = tasks.filter((thing) => {
      return thing.text !== thingToDelete;
    })
    setTasks(removeTask)
  }

  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.textContent)
    
    event.target.classList.add("selected")
  }

  const tasksToDisplay = tasks.filter((task) => {
    if (selectedCategory === "All") return true;

    return task.category === selectedCategory;
  })

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter categories={CATEGORIES} handleCategoryChange={handleCategoryChange}/>
      <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={onTaskFormSubmit}/>
      <TaskList tasks={tasks} categories={CATEGORIES} handleDelete={handleDelete} tasksToDisplay={tasksToDisplay} onTaskFormSubmit={onTaskFormSubmit}/>
    </div>
  );
}

export default App;
