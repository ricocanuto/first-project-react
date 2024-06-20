import React, { useState, useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import axios from 'axios';

import People from '../../Assets/Consulting_Isometric 1.svg';

import Arrow from '../../Assets/arrow.svg';

import {
  Container,
  H1,
  Image,
  ContainerItens,
  InputLabel,
  Input,
  Button,
} from "./styles";

function App() {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  
// Função para adicionar um novo usuário
async function addNewUser() {
  const { data: newUser } = await axios.post("https://first-project-node-two.vercel.app/Users", {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  });

    setUsers([...users, newUser]);

    history.push('/usuarios');
  }

  useEffect(() => {
    // Função fetchUsers para carregar os usuários
    async function fetchUsers() {
      const response = await axios.get("https://first-project-node-two.vercel.app/Users");
      setUsers(response.data);
    }

    // Chamar a função fetchUsers para carregar os usuários
    fetchUsers();
  
  }, []);

  
  return (
    <Container>
      <Image alt="banner-image" src={People} />
      <ContainerItens>
        <H1>Olá!</H1>

        <InputLabel>Nome</InputLabel>
        <Input ref={inputName} placeholder="Nome" type="text"/>

        <InputLabel>Age</InputLabel>
        <Input ref={inputAge} placeholder="Age" type="number"/>

        <InputLabel>Email</InputLabel>
        <Input ref={inputEmail} placeholder="Email" type="email"/>

        <Button onClick={addNewUser}>
          Cadastrar <img alt="Arrow" src={Arrow} />
        </Button>
        

      </ContainerItens>
    </Container>
  );
}

export default App;