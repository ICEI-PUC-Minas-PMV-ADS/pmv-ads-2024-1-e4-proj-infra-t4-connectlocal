import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import { logOut } from './Functions';
import { IoIosLogOut } from "react-icons/io";

interface ServicesProps{
  id: string,
  idPrestador: string,
  tipoServico: string,
  descricao: string
}

interface AvaliacoesProps{
  id: string,
  idUser: string,
  nomeUser: string,
  idPrestador: string,
  nomePrestador: string,
  idServico: string,
  nota: 0,
  comentario: string
}

interface userProps{
  id: string,
  name: string,
  email: string,
  contato: string,
  cpf: string,
  cnpj: string,
  cep: string,
  rua: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  estado: string
}

const Index: React.FC = () => {
  const isAuth = () => {
    var jwt = localStorage.getItem('jwtToken')
    if(!jwt)
      return false
    const now: number = new Date().getTime();
    const tokenTimestampStr = localStorage.getItem('timestamp');
    if (tokenTimestampStr === null) {
      return false
    }
    const tokenTimestamp: number = parseInt(tokenTimestampStr);
    const expirationTime = 8 * 60 * 60 * 1000;
    return (now - tokenTimestamp) <= expirationTime;
  }

  const [services, setServices] = useState<ServicesProps[]>([])
  const [avaliacoes, setAvaliacoes] = useState<AvaliacoesProps[]>([])
  const [user, setUser] = useState<userProps>({} as userProps)
  const [content, setContent] = useState<string>('servicos')

  useEffect(() => {
    async function fetchData() {
      const u = await getUserFromLocalStorage();
      if (u) {
        await loadServices(u);
        await loadAvaliacoes(u);
      }
    }
  
    fetchData();
  }, []);

  async function loadServices(u: { cpf: string; id: string; }) {
    const jwtToken = localStorage.getItem('jwtToken');
    let url = ''
    if (u.cpf){
      url = '/servicos'
    } else {
      url = '/servicos/prestador/' + u.id
    }
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    setServices(response.data)
  }

  async function loadAvaliacoes(u: { cpf: string; id: string; }) {
    const jwtToken = localStorage.getItem('jwtToken')
    let url = ''
    if (u.cpf){
      url = '/avaliacoes/usuario/' + u.id
    } else {
      url = '/avaliacoes/prestador/' + u.id
    }
    const response = await api.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    setAvaliacoes(response.data)
  }

  async function getUserFromLocalStorage() {
    const userStr = localStorage.getItem('user'); 
    if (userStr) {
      const user = JSON.parse(userStr);
      setUser(user)
      return user;
    } else {
      return null
    }
  }

  const handleContent = (tipo:string) => {
    setContent(tipo);
  }

  const renderServices = () => {
    if (content === 'servicos'){
      const a_servicos = document.getElementById('a_servicos')
      if (a_servicos){
        a_servicos.classList.remove('text-white')
        a_servicos.classList.add('text-purple-500');
      }

      const a_avaliacoes = document.getElementById('a_avaliacoes')
      if (a_avaliacoes){
        a_avaliacoes.classList.add('text-white')
        a_avaliacoes.classList.remove('text-purple-500');
      }
      
      return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
          <main className='my-10 md:max-w-2x1 w-72'>
            <section className="flex flex-col gap-4">
              {services.map( (service) => (
                <article key={service.id} className='w-full bg-gray-600 rounded p-2 text-white hover:scale-110 duration-200 hover:cursor-pointer'>
                  <p><span className='font-medium'>Serviço: {service.tipoServico}</span></p>
                  <p><span className='font-medium'>Descrição: {service.descricao}</span></p>
                </article>
              ))}
            </section>
          </main>
        </div>
      )
    } else {
      const a_servicos = document.getElementById('a_servicos')
      if (a_servicos){
        a_servicos.classList.add('text-white')
        a_servicos.classList.remove('text-purple-500');
      }

      const a_avaliacoes = document.getElementById('a_avaliacoes')
      if (a_avaliacoes){
        a_avaliacoes.classList.remove('text-white')
        a_avaliacoes.classList.add('text-purple-500');
      }

      return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
          <main className='my-10 md:max-w-2x1 w-72'>
            <section className="flex flex-col gap-4">
              {avaliacoes.map( (avaliacao) => (
                <article key={avaliacao.id} className='w-full bg-gray-600 rounded p-2 text-white hover:scale-110 duration-200 hover:cursor-pointer'>
                  <p><span className='font-medium'>Prestador: {avaliacao.nomePrestador}</span></p>
                  <p><span className='font-medium'>Comentário: {avaliacao.comentario}</span></p>
                  <p><span className='font-medium'>Nota: {avaliacao.nota}</span></p>
                </article>
              ))}
            </section>
          </main>
        </div>
      )
    }
  }

  if (isAuth()){
    return (
      <div className='w-full min-h-screen bg-gray-100'>
        <header className='w-full'>
          <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-600">
            <div className="flex justify-between items-center mx-auto">
              <a className="flex items-center">
                <img src="src/images/ConnectLogo.png" className="mr-3 h-6 sm:h-9" alt="Connect Local Logo" />
              </a>
              <div className="flex items-center justify-between lg:order-2 w-64 gap-1">
                <p className='text-white'>
                  Olá {' '}
                  <span className='text-purple-200 hover:cursor-pointer hover:text-purple-500'>
                    {user.name}
                  </span>
                </p>
                <a className='text-white hover:cursor-pointer hover:text-purple-500 flex items-center gap-1' onClick={logOut}>
                  <IoIosLogOut />
                  Log Out
                </a>
              </div>
              <div className="justify-between items-center w-full lg:w-auto ">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a className='text-white hover:cursor-pointer' id='a_servicos' onClick={() => handleContent('servicos')}>
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a className='text-white hover:cursor-pointer' id='a_avaliacoes' onClick={() => handleContent('avaliacoes')}>
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
    )
  } else {
    window.location.href = '/';
  }
}

export default Index;