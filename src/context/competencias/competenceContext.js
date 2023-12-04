// competenceContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CompetenceContext = createContext();

const useCompetenceContext = () => {
  return useContext(CompetenceContext);
};

const CompetenceProvider = ({ children }) => {
  const [competences, setCompetences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [PerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [detail, setDetail] = useState(false);

  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [showAlertCuestion, setAlertCuenstion] = useState(false);

  const [apiDeleteCompetence, setapiDeleteCompetence] = useState('');

  const [typeProfile, setTypeProfile] = useState(null);
// Pagination data
const totalCompetences = competences.length;
const [perPage] = useState(9);
const lastIndex = perPage * currentPage;
const firstIndex = lastIndex - perPage;
  const toggle = () => {
    setModal(!modal);
    setType(false);
  };

  const Edit = (competence) => {
    setSelectedCompetence(competence);
    setModal(true);
    setType(true);
  };

  const destroy = (id) => {
    setapiDeleteCompetence(`api/v1/competence/${id}`);
    setAlertCuenstion(true);
  };

  const handleCloseAlert = () => {
    setAlertCuenstion(false);
  };

  const seeDetail = (competence) => {
    setRegistroSeleccionado(competence);
  };

  const toggleShow = () => {
    setDetail(!detail);
    setType(false);
  };

  const getData = () => {
    try {
      axios.get('api/v1/competences').then((res) => {
        setCompetences(res.data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getData();
    const storedTypeProfile = localStorage.getItem('User');
    const json = JSON.parse(storedTypeProfile);
    setTypeProfile(json.type_profile.map((e) => e.type_profile));
  }, [modal, showAlertCuestion, searchTerm]);

  return (
    <CompetenceContext.Provider
      value={{
        competences,
        isLoading,
        searchTerm,
        handleInputChange,
        PerPage,
        firstIndex,
        lastIndex,
        currentPage,
        totalCompetences,
        setCurrentPage,
        registroSeleccionado,
        setRegistroSeleccionado,
        detail,
        modal,
        type,
        selectedCompetence,
        showAlertCuestion,
        apiDeleteCompetence,
        typeProfile,
        toggle,
        Edit,
        destroy,
        handleCloseAlert,
        seeDetail,
        toggleShow,
      }}
    >
      {children}
    </CompetenceContext.Provider>
  );
};


export {useCompetenceContext , CompetenceProvider,  }