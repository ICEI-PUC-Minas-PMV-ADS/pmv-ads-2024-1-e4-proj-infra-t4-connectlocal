import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './services/api';
import { IoIosLogOut } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegSadCry } from "react-icons/fa";
import { TbMoodSadSquint, TbMoodSad, TbMoodEmpty, TbMoodSmile, TbMoodHappy, TbMapShare } from "react-icons/tb";
import { logOut } from './Functions';

interface userProps {
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

interface ServiceProps {
  id: string;
  idPrestador: string;
  tipoServico: string;
  descricao: string;
}

interface AvaliacaoProps {
  id: string;
  idUser: string;
  nomeUser: string;
  idPrestador: string;
  nomePrestador: string;
  idServico: string;
  nota: number;
  comentario: string;
}

interface PrestadorProps {
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

const Servico: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [user, setUser] = useState<userProps>({} as userProps);
  const [prestadorDetails, setPrestadorDetails] = useState<PrestadorProps | null>(null);
  const [nota, setNota] = useState<number>(0);
  const [comentario, setComentario] = useState<string>('');
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoProps[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUser(user);
      }
    };

    const fetchService = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await api.get(`/servicos/${id}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        setService(response.data);

        const prestadorResponse = await api.get(`/usuarios/${response.data.idPrestador}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        setPrestadorDetails(prestadorResponse.data);
      } catch (error) {
        console.error('Erro ao carregar o serviço:', error);
      }
    };

    const fetchAvaliacoes = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await api.get(`/avaliacoes/servico/${id}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        setAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao carregar as avaliações:', error);
      }
    };

    fetchUser();
    fetchService();
    fetchAvaliacoes();
  }, [id]);

  const handleNavigateToGoogleMaps = () => {
    if (prestadorDetails) {
      const { rua, numero, bairro, cidade, estado, cep } = prestadorDetails;
      const address = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

  const handleAvaliacaoSubmit = async () => {
    if (service && user) {
      const data = {
        idUser: user.id,
        nomeUser: user.name,
        idPrestador: service.idPrestador,
        nomePrestador: prestadorDetails?.name,
        idServico: service.id,
        nota: nota,
        comentario: comentario,
      };

      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await api.post('/avaliacoes', data, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (response.status === 201) {
          alert('Avaliação enviada com sucesso!');
          setNota(0);
          setComentario('');
          fetchAvaliacoes();  // Recarregar avaliações após enviar uma nova
        }
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
      }
    }
  };

  const out = () => {
    logOut();
    navigate("/");
  };

  const fetchAvaliacoes = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await api.get(`/avaliacoes/servico/${id}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      setAvaliacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar as avaliações:', error);
    }
  };

  if (!service) {
    return <div>Carregando...</div>;
  }

  if (!prestadorDetails) {
    return <div>Carregando...</div>;
  }

  const renderNotaIcon = (selectedNota: number) => {
    const icons = [
      { nota: 1, icon: <TbMoodSadSquint />, color: 'text-red-500', text: 'Muito Ruim' },
      { nota: 2, icon: <TbMoodSad />, color: 'text-orange-500', text: 'Ruim' },
      { nota: 3, icon: <TbMoodEmpty />, color: 'text-yellow-500', text: 'Regular' },
      { nota: 4, icon: <TbMoodSmile />, color: 'text-green-300', text: 'Bom' },
      { nota: 5, icon: <TbMoodHappy />, color: 'text-green-500', text: 'Muito Bom' },
    ];

    return icons.map((iconObj) => (
      <div key={iconObj.nota} className="flex flex-col items-center">
        <span onClick={() => setNota(iconObj.nota)} className={`cursor-pointer ${selectedNota === iconObj.nota ? iconObj.color : 'text-black'}`}>
          {iconObj.icon}
        </span>
        <span className="text-sm mt-1">{iconObj.text}</span>
      </div>
    ));
  };

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
        <main className="my-10 md:max-w-2xl w-full">
          <section className="bg-white rounded-lg shadow-lg p-6 mt-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalhes do Serviço</h2>
            <p className="text-gray-900 font-semibold">
              <span className="font-medium">Tipo de Serviço: </span>{service.tipoServico}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Descrição: </span>{service.descricao}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Detalhes do Prestador</h3>
            <p className="text-gray-900 font-semibold">
              <span className="font-medium">Nome: </span>{prestadorDetails.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email: </span>{prestadorDetails.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contato: </span>{prestadorDetails.contato}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">CNPJ: </span>{prestadorDetails.cnpj}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Endereço: </span>{`${prestadorDetails.rua}, ${prestadorDetails.numero}, ${prestadorDetails.complemento}, ${prestadorDetails.bairro}, ${prestadorDetails.cidade}, ${prestadorDetails.estado}, ${prestadorDetails.cep}`}
            </p>

            <div className="flex justify-between mt-6">
              <button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => navigate('/index')}
              >
                Voltar
              </button>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                onClick={handleNavigateToGoogleMaps}
              >
                <TbMapShare />
                Google Maps
              </button>
            </div>
          </section>

          {user.cpf && (
            <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Avaliar Serviço</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAvaliacaoSubmit();
              }}>
                <label className="block mb-2 text-sm font-medium text-gray-900">Nota:</label>
                <div className="flex justify-between mb-4">
                  {renderNotaIcon(nota)}
                </div>

                <label className="block mb-2 text-sm font-medium text-gray-900">Comentário:</label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  rows={4}
                  required
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Enviar Avaliação
                </button>
              </form>
            </section>
          )}

          <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Avaliações</h2>
            {avaliacoes.length === 0 ? (
              <div className="flex flex-col items-center">
                <FaRegSadCry className="text-4xl text-gray-500 mb-2" />
                <p className="text-gray-700">Serviço não avaliado, deixe uma avaliação!</p>
              </div>
            ) : (
              avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="bg-gray-100 rounded-lg shadow p-4 mb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(avaliacao.nota)].map((_, index) => (
                      <TiStarFullOutline key={index} className="text-yellow-500 text-xl" />
                    ))}
                  </div>
                  <p className="text-gray-900 font-semibold">{avaliacao.nomeUser}</p>
                  <p className="text-gray-700">{avaliacao.comentario}</p>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Servico;
