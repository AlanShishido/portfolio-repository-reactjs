import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api"

function App() {
  const [ repositories , setRepositores ] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: 'AlanShishido',
      url: 'https://github.com/AlanShishido',
      techs: [
        'const 1',
        'const 2',
      ]
    })

    setRepositores([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositores(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id  }>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
