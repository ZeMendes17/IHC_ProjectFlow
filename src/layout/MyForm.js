import { useState, useEffect } from 'react';
import '../layout/MyForm.module.css';
import Input from './Input';
import TextArea from './TextArea';

function MyForm({ handleSubmit, projectData }) {

  const [project, setProject] = useState(projectData || {});
  const[formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data,setData]=useState([]);

  const submit = (e) => {
    e.preventDefault()
    setFormErrors(validate(project));
    setIsSubmit(true);
    // console.log(project)
    // handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
    console.log(project)

    fetch('http://localhost:5000/projects', {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
        }
    }).then((response) => response.json())
      .then((mj) => {console.log(mj);


      setData(mj)
      })

  }

// validation
useEffect(() => {
  console.log(formErrors)
  if(Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(project)
    handleSubmit(project)
  }
}, [formErrors])

  const validate = (values) => {

    // get project names
    let names = []

    console.log(data)

    for( let d of data ){
      names.push(d.name)
    }
    console.log(names)
    // errors
    const errors = {}
    if(!values.name) {
      errors.name = "Project has to have a name!"
    } else if (values.name.length < 3) {
      errors.name = "Project's name must have more than 3 characters'!"
    } else if (names.includes(values.name)) {
      errors.name = "You already have a Project with this name!"
    }
    if(!values.budget) {
      errors.budget = "Project must have a valide budget!"
    } else if (values.budget < 0) {
      errors.budget = "Budget's value cannot be negative"
    } else if (values.budget > 999999999) {
      errors.budget = "Your wallet can't be that big"
    }
    if(!values.description) {
      errors.description = "Project must have a description!"
    } else if (values.description.length < 10) {
      errors.description = "Project must have a bigger description!"
    }
    return errors;
  }


  return (
    <form onSubmit={submit}>
      <div>
        <Input type="text" text="Project Name" placeholder="Insert Project's Name" name="name" handleOnChange={handleChange} value={project.name? project.name : ''} />
      </div>
      <p2 className='text-red-600'>{formErrors.name}</p2>
      <div>
      <Input type="number" text="Total Budget" placeholder="Insert Project's Budget" name="budget" handleOnChange={handleChange} value={project.budget? project.budget : ''} />
      </div>
      <p2 className='text-red-600'>{formErrors.budget}</p2>
      <div>
        <TextArea text="Description" placeholder="Give your project a short description" name="description" handleOnChange={handleChange} value={project.description? project.description : ''} />
      </div>
      <p2 className='text-red-600'>{formErrors.description}</p2>
      {/* <Button onClick={() => setShowModal(true)}>Open Form Modal</Button> */}
      {/* <MyFormModal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      </MyFormModal> */}
      <button className='bg-black relative left-[115px]' type="submit">Create</button>
    </form>
  );
}

export default MyForm;