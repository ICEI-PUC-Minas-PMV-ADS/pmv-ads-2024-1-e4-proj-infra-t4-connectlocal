import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { logOut } from './Functions';

interface UserProps {
  id: string;
  name: string;
  email: string;
  contato: string;
  cpf: string;
  cnpj: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const User: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const out = () => {
    logOut();
    navigate("/");
  };

  const handleCEPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      handleCEPChange(cep);
    } else {
      setUser({
        ...user,
        cep: e.target.value
      });
    }
  };

  const handleCEPChange = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        console.error('CEP não encontrado');
        return;
      }
      setUser({ ...user, rua: data.logradouro });
      setUser({ ...user, bairro: data.bairro });
      setUser({ ...user, cidade: data.localidade });
      setUser({ ...user, estado: data.uf });
      setUser({ ...user, rua: data.logradouro });
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleSubmit = async () => {
    const data = JSON.parse(JSON.stringify(user));
    delete data['id']
    const jwtToken = localStorage.getItem('jwtToken');
    const url = `/usuarios/${user.id}`
    console.log(url)
    const response = await api.put(url, data, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    if (response.status == 204) {
      const response = await api.get(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Dados atualizados com sucesso!')
        window.location.reload()
      }
    }
  }

  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <header className='w-full'>
        <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-600">
          <div className="flex justify-between items-center mx-auto">
            <a className="flex items-center">
              <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/blob/main/src/frontend/src/images/ConnectLogo.png?raw=true" className="mr-3 h-6 sm:h-9" alt="Connect Local Logo" />
            </a>
            <div className="flex items-center justify-between lg:order-2 w-48 gap-1">
              <p className='text-white'>
                Olá {' '}
                <span className='text-purple-200 hover:cursor-pointer hover:text-purple-500'>
                  {user && user.name && user.name.split(' ')[0]}
                </span>
              </p>
              <a className='text-white hover:cursor-pointer hover:text-purple-500 flex items-center gap-1' onClick={out}>
                <IoIosLogOut />
                Log Out
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
        <main className=" md:max-w-2xl w-full">
          <section className="bg-white rounded-lg shadow-lg p-6 mt-6 mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informações cadastrais</h2>
            <form
              className="flex flex-col my-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="font-medium text-black">Nome:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Digite seu nome completo..."
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                maxLength={100}
              />

              <label className="font-medium text-black">Email:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="email"
                placeholder="exemplo@exemplo.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                maxLength={50}
              />

              <label className="font-medium text-black">Número:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="(xx) xxxxx-xxxx"
                value={user.contato}
                onChange={(e) => setUser({ ...user, contato: e.target.value })}
                maxLength={11}
              />

              {user.cpf && (
                <>
                  <label className="font-medium text-black">CPF:</label>
                  <input
                    className="w-full mb-5 p-2 rounded border"
                    type="text"
                    placeholder="Digite seu CPF..."
                    value={user.cpf}
                    onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                    maxLength={11}
                  />
                </>
              )}

              {user.cnpj && (
                <>
                  <label className="font-medium text-black">CNPJ:</label>
                  <input
                    className="w-full mb-5 p-2 rounded border"
                    type="text"
                    placeholder="Digite seu CPF..."
                    value={user.cnpj}
                    onChange={(e) => setUser({ ...user, cnpj: e.target.value })}
                    maxLength={14}
                  />
                </>
              )}

              <label className="font-medium text-black">CEP:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Digite seu CEP..."
                value={user.cep}
                onChange={handleCEPInput}
                maxLength={8}
              />

              <label className="font-medium text-black">Rua:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Rua"
                value={user.rua}
                onChange={(e) => setUser({ ...user, rua: e.target.value })}
                maxLength={100}
              />

              <label className="font-medium text-black">Número:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="number"
                placeholder="Número"
                value={user.numero}
                onChange={(e) => setUser({ ...user, numero: e.target.value })}
              />

              <label className="font-medium text-black">Complemento:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Complemento"
                value={user.complemento}
                onChange={(e) => setUser({ ...user, complemento: e.target.value })}
                maxLength={100}
              />

              <label className="font-medium text-black">Bairro:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Bairro"
                value={user.bairro}
                onChange={(e) => setUser({ ...user, bairro: e.target.value })}
              />

              <label className="font-medium text-black">Cidade:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Cidade"
                value={user.cidade}
                onChange={(e) => setUser({ ...user, cidade: e.target.value })}
                maxLength={100}
              />

              <label className="font-medium text-black">Estado:</label>
              <input
                className="w-full mb-5 p-2 rounded border"
                type="text"
                placeholder="Estado"
                value={user.estado}
                onChange={(e) => setUser({ ...user, estado: e.target.value })}
                maxLength={100}
              />

              <div className="flex justify-between mt-6">
                <button
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => navigate('/index')}
                >
                  Voltar
                </button>

                <button type='submit' className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default User;
