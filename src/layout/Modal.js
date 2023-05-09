import React from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { useState, useEffect } from "react";

export default function Modal({handleSubmit, btnText, projectData}) {
  const [showModal, setShowModal] = React.useState(false);
  const [service, setService] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
  function submit(e) {
    e.preventDefault()
    setErrors(validate(service))
    setIsSubmit(true)
  }

  useEffect(() => {
    // console.log(errors)
    if(Object.keys(errors).length === 0 && isSubmit) {
      setShowModal(false)
      service.cost = parseInt(service.cost) // nao sei se é preciso
      console.log(service)
      projectData.services.push(service)
      handleSubmit(projectData)
    }
  }, [errors])

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
    // console.log(service)
  }

  // validation
  const validate = (values) => {
    const err = {}
    if(!values.name) {
      err.name = "Task name is required!"
    }
    if(!values.cost) {
      err.cost = "A cost is needed!"
    }
    if(!values.description) {
      err.description = "Please give it a small description!"
    }

    return err;
  }






  return (
    <>
      <button
        className="bg-black text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add task
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Task
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
        <form onSubmit={submit} className="{styles.MyForm}">
            <div className="ml-4 mr-4">
              <Input type ="text" 
                text="Name" 
                name="name" 
                placeholder="Name of the task"
                handleOnChange={handleChange}
              />
            </div>
            <p2 className="text-red-600 ml-0">{errors.name}</p2>
            <div className="ml-4 mr-4">
              <Input type ="number" 
                text="Cost" 
                name="cost" 
                placeholder="Cost of the task"
                handleOnChange={handleChange}
              />
            </div>
            <p2 className="text-red-600 ml-0">{errors.cost}</p2>

            <div className="ml-4 mr-4">
              <Input type ="text" 
                text="Description" 
                name="description" 
                placeholder="Description of the task"
                handleOnChange={handleChange}
              />
            </div>
            <p2 className="text-red-600 ml-0">{errors.description}</p2>


            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent hover:text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <SubmitButton className="bg-black text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" text={btnText}/>
                </div>
        </form>  
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
