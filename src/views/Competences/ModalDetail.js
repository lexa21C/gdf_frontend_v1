import * as Reactstrap from "reactstrap";

const ModalDetalleRegistro = ({ competence, toggleShow }) => {

  return (
    <Reactstrap.Modal 
    className=" modal-lg modal-dialog-centered "
    isOpen={competence !== null} 
    toggleShow={toggleShow} 
    >
        <div divclassName="modal-body p-0 ">
        <Reactstrap.Card className="bg-secondary shadow border-0 ">
          <Reactstrap.CardHeader  className="bg-transparent pb-1"   >
            <Reactstrap.ModalHeader toggle={toggleShow} className="col-12 p-0">
          <div>
            <h4>Detalle de la Competencia: <small>{competence?.labor_competence_code}</small></h4>
            </div>
          </Reactstrap.ModalHeader>
          </Reactstrap.CardHeader>
      <Reactstrap.CardBody className=" pl-5 mb-3">
      <Reactstrap.Row className="d-flex justify-content-center flex-wrap">
        <Reactstrap.Col md="4">
        <label className="text-primary">Codigo de la Competencia:</label>
        <p> {competence?.labor_competence_code}</p>
        </Reactstrap.Col>

        {/* <Reactstrap.Col md="4">
        <label className="text-primary">Fecha de Inicio: </label>
        <p>{competence?.start_date}</p>
      </Reactstrap.Col> */}
      </Reactstrap.Row>

      <Reactstrap.Row  className="d-flex justify-content-center flex-wrap">
          <Reactstrap.Col md="4">
        <label className="text-primary">Fecha Finalización: </label>
        <p>{competence?.labor_competition}</p>
      </Reactstrap.Col>

      <Reactstrap.Col md="4">
        <label className="text-primary">Programa de Formación :</label>
        <ul>
        {competence?.program.map((program) => {
            return <li>{program.program_name}</li>
        })}
       </ul>
        </Reactstrap.Col>
   
        </Reactstrap.Row>

        <Reactstrap.Col>
        <label className="text-primary" style={{marginLeft: '23em'}}>Datos del Instructor :</label>
       
        <ul>
        {competence?.user?.map((users) => {
            return <li>
              <span style={{fontSize:'15px', marginLeft:'12em'}} className="text-primary">Nombre: </span>{users.complete_names} 
            
            <p><span style={{fontSize:'15px', marginLeft:'12em'}} className="text-primary">Correo: </span>{users.email}</p>
            
            {/* <p className="mt-0"> */}
          <label style={{fontSize:'15px', marginLeft:'12em'}}className="text-primary">Centro de Formación:</label>
          {users.training_center.map((d) => (
            <span>{d.training_center}</span>
          ))}
        {/* </p>        */}
            </li>
        })}
       </ul>
        </Reactstrap.Col>
      
      </Reactstrap.CardBody>
    </Reactstrap.Card>
    </div>
    </Reactstrap.Modal>
  );
};

export default ModalDetalleRegistro;
