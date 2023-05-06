import React, { useState } from 'react';
import Modal from 'react-modal';


function MyFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}\nBudget: ${budget}\nMessage: ${description}`);
  };

  return (
    <div>
      <button onClick={openModal}>Add tasks</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit} className="my-form">
            <div className="form-group">
                <label>Task</label>  
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Budget</label> 
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Participants</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <button type="submit">Add</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
        </form>                    
      </Modal>
    </div>
  );
}

export default MyFormModal;





