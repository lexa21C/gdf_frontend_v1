import { CompetenceUI } from "./competenceUI.js";
import { CompetenceProvider, useCompetenceContext } from '../../context/competencias/competenceContext.js';

function Competences() {
    return (
      <CompetenceProvider>
        <CompetenceUI />
      </CompetenceProvider>
    );
  }

export default Competences