import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Attention:
import JSONDATA from './mock_data.json';

function App() {

  // Adicionar novo usuário:
  // Nome
  const [nameInput, setNameInput] = useState('');
  // Email
  const [emailInput, setEmailInput] = useState('');

  // Variável para receber registros
  const [resgistersList, setRegistersList] = useState([]);

  // Variável para atualizar email de um usuário existente
  const [newEmail, setNewEmail] = useState('');

  // Variável para pesquisa
  const [search, setSearch] = useState('');

  // Obter lista de registros do DB
  useEffect(() => {
    // ATTENTION:
    Axios.get("http://localhost:3001/mock_data").then((response) => {
      setRegistersList(response.data);
    });
  }, []);

  // Enviar novo registro
  const submitRegister = () => {
    Axios.post("http://localhost:3001/api/insert", {
      first_name: nameInput,
      email: emailInput,
    });

    setRegistersList([
      ...resgistersList,
      { first_name: nameInput, email: emailInput },
    ]);
  };

  // Deletar registro
  const deleteRegister = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  // Atualizar registro
  const updateRegister = (id) => {
    Axios.put("http://localhost:3001/api/update", { email: newEmail, id: id }).then(
      (response) => {
        setRegistersList(
          resgistersList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                // first_name: val.first_name,
                email: newEmail,
              }
              : val;
          })
        );
      }
    );
  };

  function collapse(id) {
    // console.log("Function collapse called, with value " + id);
    let divName = `collapse${id}`;
    let validation = document.getElementById(`collapse${id}`).style;
    document.getElementById(divName).style.display = "block";
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title text-center mt-3 mb-3">SudoSuCRUD</h1>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Name</span>
          </div>
          <input type="text" className="form-control" placeholder="John" aria-label="Name" aria-describedby="basic-addon1" onChange={(e) => {
            setNameInput(e.target.value)
          }} />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">E-mail</span>
          </div>
          <input type="text" className="form-control" placeholder="john@protonmail.com" aria-label="Email" onChange={(e) => {
            setEmailInput(e.target.value)
          }} />
        </div>

        <div className="d-flex justify-content-center">
          <button className="mb-4 btn btn-success" onClick={submitRegister}>Save</button>
        </div>

        {/* SEARCH */}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Search:</span>
          </div>
          <input
            className="form-control"
            placeholder="Linus"
            aria-describedby="basic-addon1"

            type="text"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {JSONDATA.filter((val) => {
              if (setSearch === "") {
                return val;
              } else if (val.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;
              }
            }).map((val) => {
              return (
                <tr>
                  <th scope="row">{val.id}</th>
                  <td>{val.first_name}</td>
                  <td>{val.email}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button type="button" className="btn btn-danger" onClick={() => { deleteRegister(val.id) }}>&#128465;</button>
                      <button type="button" className="btn btn-warning " onClick={() => { collapse(val.id) }}>&#9999;</button>
                    </div>

                    <div id={`collapse${val.id}`} style={{ display: "none" }}>
                      <div className="d-flex justify-content-between">
                        <input type="text" className="form-control" placeholder="example@email.com" aria-label="" aria-describedby="basic-addon2" onChange={(e) => {
                          setNewEmail(e.target.value)
                        }} />
                        <button className="btn btn-success" type="button" onClick={() => { updateRegister(val.id) }}>V</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>



        {/* OLD CARDS */}
        {/* <div className="row d-flex justify-content-around">
          {resgistersList.map((val) => {
            return(
              <div className="col-md-5 mb-5 card text-white bg-primary">
                <div className="card-header">
                  <h5 className="card-title text-center">{val.title}</h5>
                </div>
                <div className="card-body mb-1">
                  <p className="card-text">{val.description}</p>
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"onChange={(e) => {
                    setNewEmail(e.target.value)
                  }}/>
                  <div className="input-group-append">
                    <button className="btn btn-warning" type="button" onClick={() => {updateRegister(val.id)}}>&#9999;</button>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  
                </div>
              </div>
            )
          })}
        </div> */}
      </div>
    </div>
  );
}

export default App;

// FLLOWING THIS TUTORIAL: https://www.youtube.com/watch?v=T8mqZZ0r-RA