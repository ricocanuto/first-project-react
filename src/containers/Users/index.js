import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

import Avatar from '../../Assets/avatar.svg';

import Arrow from '../../Assets/arrow.svg';

import Trash from '../../Assets/trash.svg';

import {
  Container,
  H1,
  Image,
  ContainerItens,
  Button,
  User
} from "./styles";

function Users() {
  const [users, setUsers] = useState([]);
  const history = useHistory()

// Função para deletar usuário
  async function deleteUser(userId) {
    try {
      // Fazer a requisição DELETE para remover o usuário do servidor
      await axios.delete(`https://first-project-node-two.vercel.app/Users/${userId}`);
      // Filtrar os usuários locais, removendo o usuário deletado
      const newUsers = users.filter(user => user.id !== userId);
      // Atualizar a lista de usuários localmente
      setUsers(newUsers);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

// useEffect para carregar os usuários quando o componente for montado
useEffect(() => {
  async function fetchUsers() {
    try {
      // Fazer a requisição GET para obter os usuários do servidor
      const response = await axios.get("https://first-project-node-two.vercel.app/Users");
      // Atualizar a lista de usuários localmente
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }
  // Chamar a função fetchUsers para carregar os usuários
  fetchUsers();
}, []);

function goBackPage() {
  history.push("./");
}

  return (
    <Container>
      <Image alt="banner-image" src={Avatar} />
      <ContainerItens>
        <H1>Usuários</H1>
        
        <ul>
          {users.map((user) => (
            <User key={user.id}>
              <p>{user.name}</p> - <p>{user.age}</p> - <p>{user.email}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="Lata-de-lixo" />
              </button>
            </User>
          ))}
        </ul>

        <Button onClick= {goBackPage} >
          <img alt="Arrow" src={Arrow} />Voltar</Button>  

      </ContainerItens>
    </Container>
  );
}

export default Users;



