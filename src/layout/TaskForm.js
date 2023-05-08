import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../layout/MyForm.module.css';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';



function TaskForm({handleSubmit, btnText, projectData}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
    console.log(service)
  }


  return (
    <div>
      <button onClick={openModal}>Add tasks</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <form onSubmit={submit} className="{styles.MyForm}">
            <div>
              <Input type ="text" 
                text="Task Name" 
                name="name" 
                placeholder="Name of the task"
                handleOnChange={handleChange}
              />
            </div>
            <div>
              <Input type ="number" 
                text="Task Cost" 
                name="cost" 
                placeholder="Cost of the task"
                handleOnChange={handleChange}
              />
            </div>
            <div>
              <Input type ="text" 
                text="Task Description" 
                name="description" 
                placeholder="Description of the task"
                handleOnChange={handleChange}
              />
            </div>
              <SubmitButton text={btnText}/>
              <button onClick={closeModal}>Cancel</button>
        </form>                    
      </Modal>
    </div>
  );
}

export default TaskForm;





