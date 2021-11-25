import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Attention:
// import JSONDATA from './mock_data.json';

function App() {

  // Adicionar novo usuário:
    // Nome
    const [nameInput, setNameInput] = useState('');
    // Email
    const [emailInput, setEmailInput] = useState('');
  ////

  // Variável para receber registros
  const [resgistersList, setRegistersList] = useState([]);

  // Variáveis para atualizar dados de um usuário existente
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Variável para pesquisa
  const [search, setSearch] = useState('');

  // Obter lista de registros do DB
  useEffect(() => {
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
    if (window.confirm("Are you sure you want to DELETE this register?")) {
    } else {
      console.log('Thing was not deleted from the database.');
    }
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  // Atualizar registro
  const updateRegister = (id) => {
    Axios.put("http://localhost:3001/api/update", { first_name: newFirstName, last_name: newLastName, email: newEmail, id: id }).then(
      (response) => {
        setRegistersList(
          resgistersList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                first_name: newFirstName,
                last_name: newLastName,
                email: newEmail,
              }
              : val;
          })
        );
      }
    );
    refreshPage();
  };

/*   function collapse(id) {
    // Armazena o id da div
    let idName = `collapse${id}`;

    // Recebe o estilo da div (none ou block)
    let validation = document.getElementById(`collapse${id}`).style.display;

    // Se o estilo estiver oculto, mostrá-lo; se o estilo estiver visível, ocultá-lo
    if(validation === "none"){
      document.getElementById(idName).style.display = "block";
    } else if (validation === "block"){
      document.getElementById(idName).style.display = "none";
    }
  }; */

  function edit(id){
    let validation = document.getElementById(`editFirst_name${id}`).style.display;

    if(validation === "none"){
      // tornar inputs visíveis
      document.getElementById(`editFirst_name${id}`).style.display = "block";
      document.getElementById(`editLast_name${id}`).style.display = "block";
      document.getElementById(`editEmail${id}`).style.display = "block";

      // tornar valores ocultos
      document.getElementById(`first_name${id}`).style.display = "none";
      document.getElementById(`last_name${id}`).style.display = "none";
      document.getElementById(`email${id}`).style.display = "none";

      // manejo dos botões
      document.getElementById(`editButton${id}`).style.display = "none";
      document.getElementById(`saveButton${id}`).style.display = "block";

    }
  }

  function refreshPage(){
    window.location.reload(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title text-center mt-3 mb-3">SudoSuCRUD</h1>

        <h2>Add Register</h2>
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

        <h2>Search</h2>
        <div className="input-group mb-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Name:</span>
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
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resgistersList.filter((val) => {
              if (setSearch === "") {
                return val;
              } else if (val.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;
              }
            }).map((val) => {
              return (
                <tr>
                  <th scope="row">{val.id}</th>
                  <td>
                    <div id={`first_name${val.id}`}>
                      {val.first_name}
                    </div>

                    <div id={`editFirst_name${val.id}`} style={{ display: "none" }}>
                      <input type="text" className="form-control" style={{width: "auto"}} defaultValue={`${val.first_name}`} aria-label="" aria-describedby="basic-addon2" onChange={(e) => {
                        setNewFirstName(e.target.value)
                      }} />
                    </div>
                  </td>
                  <td>
                    <div id={`last_name${val.id}`}>
                      {val.last_name}
                    </div>

                    <div id={`editLast_name${val.id}`} style={{ display: "none" }}>
                      <input type="text" className="form-control" style={{width: "auto"}} defaultValue={`${val.last_name}`} aria-label="" aria-describedby="basic-addon2" onChange={(e) => {
                        setNewLastName(e.target.value)
                      }} />
                    </div>
                  </td>
                  <td>
                    <div id={`email${val.id}`}>
                      {val.email}
                    </div>
                    
                    <div id={`editEmail${val.id}`} style={{ display: "none" }}>
                      <input type="text" className="form-control" style={{width: "auto"}} defaultValue={`${val.email}`} aria-label="" aria-describedby="basic-addon2" onChange={(e) => {
                        setNewEmail(e.target.value)
                      }} />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <button type="button" className="btn btn-danger" onClick={() => { deleteRegister(val.id) }}>&#128465;</button>
                      <div id={`editButton${val.id}`} style={{ display: "block" }}>
                        <button type="button" className="btn btn-warning " onClick={() => { edit(val.id) }}>&#9999;</button>
                      </div>
                      <div id={`saveButton${val.id}`} style={{ display: "none" }}>
                        <button type="button" className="btn btn-success " onClick={() => { updateRegister(val.id) }}>&#10003;</button>
                      </div>
                    </div>

                    {/* <div id={`collapse${val.id}`} style={{ display: "none" }}>
                      <div className="d-flex ">
                        <input type="text" className="form-control" style={{width: "auto"}} placeholder="example@email.com" aria-label="" aria-describedby="basic-addon2" onChange={(e) => {
                          setNewEmail(e.target.value)
                        }} />
                        <button className="btn btn-success" type="button" onClick={() => { updateRegister(val.id) }}>&#10003;</button>
                      </div>
                    </div> */}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

/* Roteiro:
  -exibir demais campos &&
  -função editar: substituir o txt pelo input com o valor do prórpio
*/
