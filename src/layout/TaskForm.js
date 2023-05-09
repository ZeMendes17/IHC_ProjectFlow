import React, { useState } from 'react';
import Modal from '../layout/Modal';
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
      <Modal />
    </div>
  );
}

export default TaskForm;





