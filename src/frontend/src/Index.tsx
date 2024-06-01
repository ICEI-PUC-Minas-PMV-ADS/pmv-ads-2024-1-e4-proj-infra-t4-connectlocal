import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import { logOut } from './Functions';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { TiStarFullOutline } from "react-icons/ti";
import { FiTrash } from 'react-icons/fi';

interface ServicesProps {
  id: string;
  idPrestador: string;
  tipoServico: string;
  descricao: string;
}

interface AvaliacoesProps {
  id: string;
  idUser: string;
  nomeUser: string;
  idPrestador: string;
  nomePrestador: string;
  idServico: string;
  nota: number;
  comentario: string;
}

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

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServicesProps[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesProps[]>([]);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [content, setContent] = useState<string>('servicos');

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromLocalStorage();
      if (user) {
        await loadServices(user);
        await loadAvaliacoes(user);
      } else {
        navigate('/');
      }
    };

    fetchData();
  }, []);

  const out = () => {
    logOut();
    navigate("/");
  };

  const isAuth = (): boolean => {
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) return false;

    const now: number = new Date().getTime();
    const tokenTimestampStr = localStorage.getItem('timestamp');
    if (!tokenTimestampStr) return false;

    const tokenTimestamp: number = parseInt(tokenTimestampStr);
    const expirationTime = 8 * 60 * 60 * 1000; // 8 hours
    return (now - tokenTimestamp) <= expirationTime;
  };

  const getUserFromLocalStorage = async (): Promise<UserProps | null> => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: UserProps = JSON.parse(userStr);
      setUser(user);
      return user;
    }
    return null;
  };

  const loadServices = async (user: UserProps) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const url = user.cpf ? '/servicos' : `/servicos/prestador/${user.id}`;
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    setServices(response.data);
  };

  const loadAvaliacoes = async (user: UserProps) => {
    const jwtToken = localStorage.getItem('jwtToken');
    const url = user.cpf ? `/avaliacoes/usuario/${user.id}` : `/avaliacoes/prestador/${user.id}`;
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    setAvaliacoes(response.data);
  };

  const handleContent = (tipo: string) => {
    setContent(tipo);
  };

  const handleSubmit = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const tipoElement = document.getElementById('select_ts') as HTMLSelectElement | null;
    const descElement = document.getElementById('desc_s') as HTMLInputElement | null;

    if (tipoElement && descElement) {
      const tipoValue = tipoElement.value;
      const descValue = descElement.value;

      if (descValue.trim() !== '') {
        const data = {
          idPrestador: user.id,
          tipoServico: tipoValue,
          descricao: descValue,
        };

        try {
          const response = await api.post('/servicos', data, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          });

          if (response.status === 201) {
            alert('Serviço cadastrado com sucesso');
            window.location.reload();
          }
        } catch (error) {
          alert('Erro ao cadastrar Serviço.');
          console.error(error);
        }
      } else {
        console.log('A descrição está vazia');
      }
    }
  };

  const handleUserClick = () => {
    navigate(`/user`);
  };

  const renderServices = () => {
    const handleCardClick = (id: string) => {
      navigate(`/servico/${id}`);
    };

    const handleServiceDelete = async (id: string) => {
      const jwtToken = localStorage.getItem('jwtToken');
      const url = `/servicos/${id}`
      const response = await api.delete(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (response.status == 204) {
        renderServices()
        alert('Serviço deletado com sucesso');
      } else {
        console.log('Erro ao deletar serviço')
      }
    }

    const handleAvaliacaoDelete = async (id: string) => {
      const jwtToken = localStorage.getItem('jwtToken');
      const url = `/avaliacoes/${id}`
      const response = await api.delete(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      if (response.status == 204) {
        renderServices()
        alert('Avaliação deletada com sucesso');
      } else {
        console.log('Erro ao deletar serviço')
      }
    }

    if (content === 'servicos') {
      document.getElementById('a_servicos')?.classList.replace('text-white', 'text-purple-500');
      document.getElementById('a_avaliacoes')?.classList.replace('text-purple-500', 'text-white');

      return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
          <main className="my-10 md:max-w-2xl w-full">
            {user.cnpj && (
              <section className="bg-white rounded-lg shadow-lg p-6 mt-6 mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cadastrar Serviço</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <label className="block mb-2 text-sm font-medium text-gray-900">Tipo de serviço:</label>
                  <select className="w-full mb-4 p-2 rounded border border-gray-300" id="select_ts">
                    <option value="Pedreiro">Pedreiro</option>
                    <option value="Borracheiro">Borracheiro</option>
                    <option value="Pintor">Pintor</option>
                    <option value="Encanador">Encanador</option>
                    <option value="Eletricista">Eletricista</option>
                  </select>

                  <label className="block mb-2 text-sm font-medium text-gray-900">Descrição:</label>
                  <textarea
                    className="w-full mb-4 p-2 rounded border border-gray-300"
                    placeholder="Descreva seu serviço..."
                    id="desc_s"
                    maxLength={255}
                  />

                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Enviar Cadastro
                  </button>
                </form>
              </section>
            )}
            <section className="flex flex-col gap-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="w-full bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 cursor-pointer relative"
                  onClick={() => handleCardClick(service.id)}
                >
                  <div className="relative">
                    <p className="text-gray-900 font-semibold">
                      <span className="font-medium">Serviço: </span>
                      {service.tipoServico}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Descrição: </span>
                      {service.descricao}
                    </p>
                  </div>

                  {user.cnpj && (
                    <button
                      className='absolute top-2 right-2 bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceDelete(service.id);
                      }}
                    >
                      <FiTrash size={18} color='#FFF' />
                    </button>
                  )}
                </article>
              ))}
            </section>
          </main>
        </div>
      )
    } else {
      document.getElementById('a_servicos')?.classList.replace('text-purple-500', 'text-white');
      document.getElementById('a_avaliacoes')?.classList.replace('text-white', 'text-purple-500');

      return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
          <main className="my-10 md:max-w-2xl w-full">
            <section className="flex flex-col gap-4">
              {avaliacoes.map((avaliacao) => (
                <article
                  key={avaliacao.id}
                  className="w-full bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 relative"
                >
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      {[...Array(avaliacao.nota)].map((_, i) => (
                        <TiStarFullOutline key={i} className="text-yellow-500 mr-1" />
                      ))}
                    </div>
                    <p className="text-gray-900">
                      <span className="font-semibold">Prestador:</span> {avaliacao.nomePrestador}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Comentário:</span> {avaliacao.comentario}
                    </p>
                  </div>

                  {user.cpf && (
                    <button
                      className='absolute top-2 right-2 bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAvaliacaoDelete(avaliacao.id);
                      }}
                    >
                      <FiTrash size={18} color='#FFF' />
                    </button>
                  )}
                </article>
              ))}
            </section>
          </main>
        </div>
      );
    }
  };

  if (isAuth()) {
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <header className="w-full">
          <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-600">
            <div className="flex justify-between items-center mx-auto">
              <a className="flex items-center">
                <img
                  src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/blob/main/src/frontend/src/images/ConnectLogo.png?raw=true"
                  className="mr-3 h-6 sm:h-9"
                  alt="Connect Local Logo"
                />
              </a>
              <div className="flex items-center justify-between lg:order-2 w-48 gap-1">
                <p className="text-white">
                  Olá{' '}
                  <span
                    className="text-purple-200 cursor-pointer hover:text-purple-500"
                    onClick={() => handleUserClick()}
                  >
                    {user && user.name && user.name.split(' ')[0]}
                  </span>
                </p>
                <a className="text-white cursor-pointer hover:text-purple-500 flex items-center gap-1" onClick={out}>
                  <IoIosLogOut />
                  Log Out
                </a>
              </div>
              <div className="justify-between items-center w-full lg:w-auto">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a className="text-white cursor-pointer" id="a_servicos" onClick={() => handleContent('servicos')}>
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a className="text-white cursor-pointer" id="a_avaliacoes" onClick={() => handleContent('avaliacoes')}>
                      Avaliações
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {renderServices()}
      </div>
    );
  } else {
    navigate('/')
    return null;
  }
};

export default Index;
