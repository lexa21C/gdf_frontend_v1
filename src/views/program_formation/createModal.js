import React, { useState, useEffect } from "react";
import * as Reactstrap from "reactstrap";
import axios from "axios";
import SelectSearch from "../../components/SelectSearch/SelectSearch.js";
import { useParams } from "react-router-dom";
import AlertModal from "../../components/Alert/AlertModal.js";
import InputValidation from "../../Helpers/validacion.js";
import Select from "react-select";

const CreateProgram  = ({ isOpen, toggle, apiGet, apiGetPrograms, type }) => {
  //program
  const [data, setData] = useState({});
  const [selectedResult] = useState(null);
  const { program_id } = useParams();
  //competence
  const [competence, setCompetence] = useState([]);
  const [selectedCompetence, setSelectedCompetence] = useState([]);
  //program Level
  const [programLevel, setProgramLevel] = useState([]);
  const [selectedProgramLevel, setSelectedProgramLevel] = useState([]);
  // thematic line
  const [thematicLine, setThematicLine] = useState(null);
  const [selectedThematicLine, setSelectedThematicLine] = useState(null);
  // alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  //estados de titulos y botones
  const [title, setTitle] = useState("");
  const [nameButton, setNameButton] = useState("");
  //user
  const user = localStorage.getItem("User");
  let user_JSON = JSON.parse(user);
  let formation_programId = user_JSON.formation_program[0]._id;

  //validación del formulario
  const [isValidForm, setIsValidForm] = useState(true);

  //variables
  let options_program = [];
  let optionsProgramLevel = [];
  let optionsThematicLine = [];

  // Función para actualizar el estado isValidForm
  const setInputValidity = (isValid) => {
    setIsValidForm(isValid);
  };
  // funciones get 
  const getProgramLevel = async () => {
    const { data } = await axios.get("api/v1/programlevels");
    console.log(data.results);
    setProgramLevel(data.results);
    console.log("program:", programLevel);
  };
  const getCompetence = async () => {
    const { data } = await axios.get("api/v1/formation_programs");
    console.log(data.results);
    setCompetence(data.results);
    console.log("program:", competence);
  };

  const getThematicLine = async () => {
    const { data } = await axios.get("api/v1/thematics");
    console.log(data.results);
    setThematicLine(data.results);
    console.log("program:", thematicLine);
  };
  // function edit program formation
  const editProgram = async () => {
    try {
      const { data: res } = await axios.put(`api/v1/formation_program/${data._id}`, data);
      setAlertType(res.data.status);
          setAlertMessage(res.data.message);
          setShowAlert(true);
    } catch (err){
      setAlertType(err.status);
          setAlertMessage(err.message);
          setShowAlert(true);

    }
  }
  // function create program formation
  const createProgramFormation = async () => {
    try {
      const res= await axios.post("api/v1/formation_program", data)
      if (res.data.status === "success") {
        toggle(!toggle);

        setData({
          program_name: "",
          program_code: "",
          total_duration: "",
          Program_version: "",
          competence: "",
          program_level: "",
          thematic_line: "",
        });
      }
      setAlertType(res.data.status);
      setAlertMessage(res.data.message);
      setShowAlert(true);
    }catch (err){
      setAlertType(err.status);
          setAlertMessage(err.message);
          setShowAlert(true);

    }
  }
  useEffect(() => {
    console.log("entra al modal");
    if (type === true) {
      const fetchData = async () => {
        const { data } = await axios.get(apiGet);
        setData(data.results);
        console.log(data);
      };

      fetchData();

      setTitle("Editar");
      setNameButton("Actualizar");
    } else {
      console.log("entra al modal");
      setData({
        program_name: "",
        program_code: "",
        number_quarters: "",
        total_duration: "",
        Program_version: "",
        competence: "",
        program_level: "",
        thematic_line: "",
      });
      setTitle("Registrar");
      setNameButton("Registrar");
    }
    getCompetence();
    getProgramLevel();
    getThematicLine();
  }, [program_id, selectedResult, type, apiGet]);

  for (let i = 0; i < competence?.length; i++) {
    options_program.push({
      value: competence[i]?._id,
      label: competence[i]?.program_name,
    });
  }
  for (let i = 0; i < programLevel?.length; i++) {
    optionsProgramLevel.push({
      value: programLevel[i]?._id,
      label: programLevel[i]?.program_level,
    });
  }
  for (let i = 0; i < thematicLine?.length; i++) {
    optionsThematicLine.push({
      value: thematicLine[i]?._id,
      label: thematicLine[i]?.thematic_line,
    });
  }
  const handleResultSelected = (result) => {
    setData({ ...data, user: result });
  };
  const handleSelectChangeCompetence = (selectedCompetence) => {
    setData({
      ...data,
      competence: selectedCompetence.map((e) => e.value),
    });
    setSelectedCompetence(selectedCompetence);
  };
  const handleSelectChangeProgramLevel = (selectedProgramLevel) => {
    setData({ ...data, program_level: selectedProgramLevel.value });
    setSelectedProgramLevel(selectedProgramLevel);
  };
  const handleSelectChangeThematicLine = (selectedThematicLine) => {
    setData({ ...data, formation_program: selectedThematicLine.value});
    setSelectedThematicLine(selectedThematicLine);
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
      console.log("registrar");
      console.log(data);

      axios
        .post("api/v1/formation_program", data)
        .then((res) => {
          if (res.data.status === "success") {
            toggle(!toggle);

            setData({
              program_name: "",
              program_code: "",
              total_duration: "",
              Program_version: "",
              competence: "",
              program_level: "",
              thematic_line: "",
            });
          }
          setAlertType(res.data.status);
          setAlertMessage(res.data.message);
          setShowAlert(true);
        })
        .catch((err) => {
          setAlertType(err.status);
          setAlertMessage(err.message);
          setShowAlert(true);
        });
    } else {
      // const { data: res } = axios
      //   .put(`api/v1/formation_program/${data._id}`, data)
      //   .then((res) => {
      //     setAlertType(res.data.status);
      //     setAlertMessage(res.data.message);
      //     setShowAlert(true);
      //   })
      //   .catch((err) => {
      //     setAlertType(err.status);
      //     setAlertMessage(err.message);
      //     setShowAlert(true);
      //   });
      editProgram()
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
                    name="program_name"
                    minLength={2}
                    value={data?.program_name}
                    onChange={(value) => handleChange2(value, "program_name")}
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
                    name="program_code"
                    minLength={6}
                    value={data.program_code}
                    onChange={(value) => handleChange2(value, "program_code")}
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
                      value={selectedProgramLevel}
                      onChange={handleSelectChangeProgramLevel}
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
                    name="Program_version"
                    minLength={1}
                    value={data?.Program_version}
                    onChange={(value) =>
                      handleChange2(value, "Program_version")
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
                    name="total_duration"
                    minLength={1}
                    value={data?.estimated_duration}
                    onChange={(value) => handleChange2(value, "total_duration")}
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
                      value={selectedThematicLine}
                      onChange={handleSelectChangeThematicLine}
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
                      value={selectedCompetence}
                      isMulti
                      onChange={handleSelectChangeCompetence}
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
