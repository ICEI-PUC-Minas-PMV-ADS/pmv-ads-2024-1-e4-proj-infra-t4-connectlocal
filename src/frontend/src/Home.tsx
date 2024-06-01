import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from './services/api';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  async function handleSubmit(e: { preventDefault: () => void; }) {
    if (!login.email && !login.password) {
      alert('Por favor, preencha os campos de Email e Senha.')
      return;
    }
    try {
      e.preventDefault();

      let data = {
        'email': login.email,
        'password': login.password
      }

      const response = await api.post('/usuarios/authentication', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const token = response.data.jwtToken;
        const user = response.data.user;
        const now: Date = new Date();
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('timestamp', now.getTime().toString())
        navigate("/index")
      }
    } catch (error) {
      console.log(error)
      alert('Usuário ou senha inválidos!')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      <div className='hidden lg:block relative w-0 flex-1 bg-gray-500'>
        <div className='flex h-full justify-center items-center'>
          <img src='https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/9ac073c66a7f35c0f34f02b7b5885078d0648adf/src/frontend/src/images/logo_home.svg'></img>
          <div className='absolute left-5 bottom-5 text-6xl text-white'>
            <h1>Bem vindo ;)</h1>
          </div>
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm '>
          <div>
            <img src='https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/blob/main/src/frontend/src/images/ConnectLogo.png?raw=true'></img>
            <h2 className='mt-6 text-3x1 font-semibold text-purple-500'>Entrar</h2>
            <p className='mt-2 text-sm text-gray-600 max-w'>
              Novo por aqui? {' '}
              <Link to="/cadastro" className='font-medium text-purple-500'>
                Cadastre-se
              </Link>
            </p>
          </div>
          <div className='mt-6'>
            <form action='' onSubmit={handleSubmit}>
              <label className="font-medium text-black">Email:</label>
              <input
                id='email'
                className="w-full mb-5 p-2 rounded"
                type="email"
                placeholder="exemplo@exemplo.com"
                maxLength={50}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
              <label className="font-medium text-black">Senha:</label>
              <input
                name='password'
                className="w-full mb-5 p-2 rounded"
                type="password"
                placeholder="••••••••"
                maxLength={30}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
              />
              <div>
                <button
                  className='bg-transparent hover:bg-purple-500 text-black font-semibold hover:text-black py-2 px-4 border border-purple-500 hover:border-transparent rounded'
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;