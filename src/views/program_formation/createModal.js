import React, { useState, useEffect } from 'react';
import * as Reactstrap from 'reactstrap'
import axios from 'axios';
import SelectSearch from "../../components/SelectSearch/SelectSearch.js"
import { useParams } from "react-router-dom";
import AlertModal from '../../components/Alert/AlertModal.js'
import InputValidation from '../../Helpers/validacion.js'
import Select from "react-select";

const CreateProgram = ({ isOpen, toggle, apiGet,  apiGetPrograms,type }) => {
  /*Formation prograns*/
  const [competence,setCompetence] = useState([]);
  const [ programLevel, setProgramLevel] = useState([])
  const [ thematicLine, setThematicLine] = useState([])
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const user = localStorage.getItem('User')

  let user_JSON = JSON.parse(user)

  let formation_programId = user_JSON.formation_program[0]._id


  const [data, setData] = useState({});

  const [selectedResult] = useState(null);

  const { program_id } = useParams()
  
  // alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  //validación del formulario
  const [isValidForm, setIsValidForm] = useState(true);

  // Función para actualizar el estado isValidForm
  const setInputValidity = (isValid) => {
    setIsValidForm(isValid);
  };
  let options_program = [];
  let optionsProgramLevel = [];
  let optionsThematicLine = [];
   //estados de titulos y botones
   const [title, setTitle] = useState("");
   const [nameButton, setNameButton] = useState("");
   const getProgramLevel= async () => {
    const { data } = await axios.get('api/v1/programlevels');
    console.log(data.results)
   setProgramLevel(data.results)
    console.log('program:', programLevel)
  };
  const getCompetence = async () => {
    const { data } = await axios.get('api/v1/formation_programs');
    console.log(data.results)
   setCompetence(data.results)
    console.log('program:',competence)
  };
  
  const getThematicLine = async () => {
    const { data } = await axios.get('api/v1/thematics');
    console.log(data.results)
   setThematicLine(data.results)
    console.log('program:',thematicLine)
  };
  
  useEffect(() => { 
    
    
   
  
    console.log('entra al modal')
    if (type === true) {
      const fetchData = async () => {
        const { data } = await axios.get(apiGet);
        setData(data.results);
        console.log(data)
      }

      fetchData();

      setTitle("Editar");
      setNameButton("Actualizar");

    } else {
      console.log('entra al modal')
      setData({
        labor_competition: '',
        labor_competence_code: '',
        program_competition: '',
        labor_competition_version: '',
        estimated_duration: ''
    
      })
      
      setTitle("Registrar");
      setNameButton("Registrar");
    }
   getCompetence()
   getProgramLevel()
   getThematicLine()
    
  }, [program_id, selectedResult, type, apiGet])
  
  for (let i = 0; i <competence?.length; i++) {
    options_program.push({
      value: competence[i]?._id,
      label: competence[i]?.program_name,
    });
  }
  for (let i = 0; i <programLevel?.length; i++) {
    optionsProgramLevel.push({
      value: programLevel[i]?._id,
      label: programLevel[i]?.program_level,
    });
  }
  for (let i = 0; i <thematicLine?.length; i++) {
    optionsThematicLine.push({
      value: thematicLine[i]?._id,
      label: thematicLine[i]?.thematic_line,
    });
  }
  const handleResultSelected = (result) => {
    setData({ ...data, user: result });
  }
  const handleSelectChange = (selectedProgram) => {
    setData({ ...data, formation_program: selectedProgram.map((e) => e.value) });
    setSelectedPrograms(selectedProgram);
  };
  const handleSelectChange1 = (selectedProgram) => {
    // setData({ ...data, formation_program: selectedProgram.map((e) => e.value) });
    setSelectedPrograms(selectedProgram);
  };
  const handleSelectChange2 = (selectedProgram) => {
    // setData({ ...data, formation_program: selectedProgram.map((e) => e.value) });
    setSelectedPrograms(selectedProgram);
  };


  const handleChange2 = (value, fieldName) => {
    setData({ ...data, [fieldName]: value });
  };

   //  alertas
   const handleCloseAlert = () => {
    setShowAlert(false);
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();

    //validación del formulario
    if (!isValidForm) {
      // Si hay algún error de validación, no envíes el formulario
      return;
    }

      if (type === false) {

    
        axios.post('api/v1/competence', data).then(
          (res) => {
            if(res.data.status==='success'){
              toggle(!toggle);

              setData({
                labor_competition: '',
                labor_competence_code: '',
                program_competition: '',
                labor_competition_version: '',
                estimated_duration: ''
            
              })
            }
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
            setShowAlert(true);
          }

        ).catch((err) => {
          setAlertType(err.status);
          setAlertMessage(err.message);
          setShowAlert(true);
        });
      } else {
        const { data: res } = axios.put(`api/v1/competence/${data._id}`, data).then(
          (res) => {
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
            setShowAlert(true);

          }).catch((err) => {
            setAlertType(err.status);
            setAlertMessage(err.message);
            setShowAlert(true);
          })
        toggle(!toggle);
      }
  };
  return (
    <>
      <Reactstrap.Modal
        className="modal-dialog-centered "
        isOpen={isOpen}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Reactstrap.Card className="bg-secondary shadow border-0">
            <Reactstrap.CardHeader className="bg-transparent pb-1">
              <Reactstrap.ModalHeader toggle={toggle} className="col-12 p-0">
                <div>
                  <h4>{title} Programa </h4>
                </div>
              </Reactstrap.ModalHeader>
            </Reactstrap.CardHeader>

            <Reactstrap.CardBody className="px-lg-5 py-lg-5">
              <Reactstrap.Form onSubmit={handleSubmit}>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Programa
                  </label>
                  <InputValidation
                    placeholder="Ejemplo: OPERACIÓN DE EQUIPOS"
                    type="textarea"
                    name="labor_competition"
                    minLength={2}
                    value={data?.labor_competition}
                    onChange={(value) =>
                      handleChange2(value, "labor_competition")
                    }
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
                </Reactstrap.FormGroup>

                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Código 
                  </label>
                  <InputValidation
                    placeholder="Ejemplo: 147837"
                    type="number"
                    name="labor_competence_code"
                    minLength={6}
                    value={data.labor_competence_code}
                    onChange={(value) =>
                      handleChange2(value, "labor_competence_code")
                    }
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
                </Reactstrap.FormGroup>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>Nivel de Programa
                  </label>

                  <Reactstrap.FormGroup>
                    <Select
                      options={optionsProgramLevel}
                      value={selectedPrograms}
                      onChange={handleSelectChange1}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Version
                  </label>
                  <InputValidation
                    placeholder="Numero"
                    type="number"
                    name="labor_competition_version"
                    minLength={1}
                    value={data?.labor_competition_version}
                    onChange={(value) =>
                      handleChange2(value, "labor_competition_version")
                    }
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
                </Reactstrap.FormGroup>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Duración Estimada
                  </label>
                  <InputValidation
                    placeholder="Horas"
                    type="number"
                    name="estimated_duration"
                    minLength={1}
                    value={data?.estimated_duration}
                    onChange={(value) =>
                      handleChange2(value, "estimated_duration")
                    }
                    setIsValid={setInputValidity} // Pasamos la función setIsValidForm al componente InputValidation
                  />
                </Reactstrap.FormGroup>
                
                
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>Linea Tematica 
                  </label>

                  <Reactstrap.FormGroup>
                    <Select
                      options={optionsThematicLine}
                      value={selectedPrograms}
                      onChange={handleSelectChange2}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>
                <Reactstrap.FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    <span className="text-danger">*</span>
                    Competencia
                  </label>

                  <Reactstrap.FormGroup>
                    <Select
                      options={options_program}
                      value={selectedPrograms}
                      isMulti
                      onChange={handleSelectChange}
                    />
                  </Reactstrap.FormGroup>
                </Reactstrap.FormGroup>
        

                <div className="text-center">
                  <Reactstrap.Button
                    className="my-4"
                    color="primary"
                    type="submit"
                  >
                    {nameButton}
                  </Reactstrap.Button>
                </div>
              </Reactstrap.Form>
            </Reactstrap.CardBody>
          </Reactstrap.Card>
        </div>
      </Reactstrap.Modal>
      {showAlert && (
        <AlertModal
          type={alertType}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
};

export default CreateProgram;