import React, { useState } from 'react';

export default function MainContent() {
    const [task, setNewTask] = useState('');
    const [tasks, setTasks] = useState(["read books"]);
    const [compTasks, setCompTasks] = useState([]);
    const [Selectedtask, setSelectedtask] = useState('')

    const handleTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTaskBtn();
        }
    };

    const addTaskBtn = () => {
        if (task.trim() === '') {
            alert('Task cant be empty');
        } else {
            setTasks([...tasks, task]);
            setNewTask('');
        }
    };

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.task-row')) {
            setSelectedtask('');
        }
    });

    let selectedTaskvalue

    const taskRowSelected = (event) => {
        if (!selectedTaskvalue) {
            selectedTaskvalue = event.currentTarget.querySelector('.task-column').innerText;
            console.log(selectedTaskvalue)
            setSelectedtask(event.target);
        }

        document.getElementById('compBtn').addEventListener('click', () => {
            setCompTasks([...compTasks, selectedTaskvalue])
            setTasks(prevTasks => prevTasks.filter(task => task.toLowerCase() !== selectedTaskvalue.toLowerCase()));
            setSelectedtask('')
        })

        document.getElementById('remBtn').addEventListener('click', () => {
            setTasks(prevTasks => prevTasks.filter(task => task.toLowerCase() !== selectedTaskvalue.toLowerCase()));
            setSelectedtask('')
        })
    }

    const compDivselected = (event) => {
        let selectedTaskvalue = event.currentTarget.querySelector('.task-column').innerText;
        document.getElementById("remBtn").disabled = false;

        document.getElementById('remBtn').addEventListener('click', () => {
            setCompTasks(prevTasks => prevTasks.filter(task => task.toLowerCase() !== selectedTaskvalue.toLowerCase()));
            setSelectedtask('')
        })
    }

    return (
        <div className="container my-3">
            <div className="row my-3">
                <div className="col-md-6 my-3">
                    <div className="task-div" id='pending'>

                        <div className="pending-head task-row bg-info text-light ">
                            <div className="task-column ">Pending Tasks ↓</div>
                        </div>
                        {tasks.map((task, index) => (
                            <div key={index} className="task-row bg-danger text-light clickable-div" onClick={taskRowSelected}>
                                <div className="task-num"></div>
                                <div className="task-column">{task}</div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="col-md-6 my-3">
                    <div className=" text-white">
                        <div className="task-div" id='completed'>

                            <div className="pending-head task-row bg-info text-light ">
                                <div className="task-column "> Completed Tasks ↓</div>
                            </div>
                            {compTasks.map((task, index) => (
                                <div key={index} className="task-row bg-success text-light clickable-div" onClick={compDivselected}>
                                    <div className="task-num"></div>
                                    <div className="task-column">{task}</div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <div className=" p-3 text-white d-flex">
                        <input className="form-control me-2 task-input" placeholder="Add task..." value={task} onChange={handleTaskChange} onKeyDown={handleKeyDown} />
                        <button className="btn btn-outline-warning" onClick={addTaskBtn}>Add Task</button>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="text-white">
                        <button
                            className={` btn btn-success text-light my-3 mx-3`}
                            disabled={Selectedtask == '' ? true : false}
                            id='compBtn'
                        > Mark as Completed
                        </button>

                        <button
                            className={` btn btn-danger text-light my-3 mx-3`}
                            disabled={Selectedtask == '' ? true : false}
                            id='remBtn'
                        > Remove Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
