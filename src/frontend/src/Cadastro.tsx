import { api } from './services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<number>(1);
  const [tipoConta, setTipoConta] = useState<number>(0);

  const [cadastro, setCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    senha1: '',
    contato: '',
    tipo: '0',
    doc: '',
  })

  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const avancarEtapa = () => {
    setEtapa(etapa + 1);
  };

  const retrocederEtapa = () => {
    setEtapa(etapa - 1);
  };

  const handleTipoContaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoConta(parseInt(e.target.value, 10));
    setCadastro({ ...cadastro, tipo: e.target.value });
  };

  const renderCamposAdicionais = () => {
    if (tipoConta === 0) {
      return (
        <>
          <label className="font-medium text-black">CPF:</label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="text"
            placeholder="Digite seu CPF..."
            value={cadastro.doc}
            onChange={(e) => setCadastro({ ...cadastro, doc: e.target.value })}
            maxLength={11}
          />
        </>
      );
    } else if (tipoConta === 1) {
      return (
        <>
          <label className="font-medium text-black">CNPJ:</label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="text"
            placeholder="Digite seu CNPJ..."
            value={cadastro.doc}
            onChange={(e) => setCadastro({ ...cadastro, doc: e.target.value })}
            maxLength={14}
          />
        </>
      );
    }
  };

  const handleCEPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      handleCEPChange(cep);
    } else {
      setEndereco({
        ...endereco,
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
      setEndereco({
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        cep,
        numero: '',
        complemento: '',
      });
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  type CadastroType = {
    nome: string;
    email: string;
    senha: string;
    senha1: string;
    contato: string;
    tipo: string;
    doc: string;
  };

  type EnderecoType = {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };

  const validarCadastro = () => {
    for (let key in cadastro) {
      if (!cadastro[key as keyof CadastroType]) {
        return false
      }
    }

    for (let key in endereco) {
      if (!endereco[key as keyof EnderecoType]) {
        return false
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    const camposPreenchidos = validarCadastro();
    if (!camposPreenchidos) {
      alert('Por favor, preencha todos os campos.')
      return;
    }

    if (cadastro.senha !== cadastro.senha1) {
      setEtapa(1)
      renderEtapa()
      return alert('Senhas são diferentes.')
    }

    try {
      let data

      if (cadastro.tipo === '0') {
        data = {
          "type": cadastro.tipo,
          "name": cadastro.nome,
          "password": cadastro.senha,
          "contato": cadastro.contato,
          "email": cadastro.email,
          "cpf": cadastro.doc,
          "rua": endereco.rua,
          "numero": endereco.numero,
          "complemento": endereco.complemento,
          "bairro": endereco.bairro,
          "cidade": endereco.cidade,
          "estado": endereco.estado,
          "cep": endereco.cep
        };
      } else {
        data = {
          "type": cadastro.tipo,
          "name": cadastro.nome,
          "password": cadastro.senha,
          "contato": cadastro.contato,
          "email": cadastro.email,
          "cnpj": cadastro.doc,
          "rua": endereco.rua,
          "numero": endereco.numero,
          "complemento": endereco.complemento,
          "bairro": endereco.bairro,
          "cidade": endereco.cidade,
          "estado": endereco.estado,
          "cep": endereco.cep
        };
      }

      const response = await api.post('/usuarios', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso! Realize o Login.')
        navigate("/home");
      }
    } catch (error) {
      alert('Email já está em uso.')
    }
  };

  const renderEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <div>
            <label className="font-medium text-black">Nome:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Digite seu nome completo..."
              value={cadastro.nome}
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
              maxLength={100}
            />

            <label className="font-medium text-black">Email:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="email"
              placeholder="exemplo@exemplo.com"
              value={cadastro.email}
              onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })}
              maxLength={50}
            />

            <label className="font-medium text-black">Senha:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="password"
              placeholder="••••••••"
              value={cadastro.senha}
              onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })}
              maxLength={30}
            />

            <label className="font-medium text-black">Confirme a senha:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="password"
              placeholder="••••••••"
              value={cadastro.senha1}
              onChange={(e) => setCadastro({ ...cadastro, senha1: e.target.value })}
              maxLength={30}
            />

            <label className="font-medium text-black">Número:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="(xx) xxxxx-xxxx"
              value={cadastro.contato}
              onChange={(e) => setCadastro({ ...cadastro, contato: e.target.value })}
              maxLength={11}
            />

            <div className='flex justify-between'>
              <Link to="/">
                <button
                  className='bg-transparent hover:bg-yellow-500 text-black font-semibold hover:text-black py-2 px-4 border border-yellow-500 hover:border-transparent rounded'>
                  Voltar
                </button>
              </Link>

              <button
                className='bg-transparent hover:bg-purple-500 text-black font-semibold hover:text-black py-2 px-4 border border-purple-500 hover:border-transparent rounded'
                onClick={avancarEtapa}>
                Próxima Etapa
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="font-medium text-black">Tipo de conta:</label>
            <select
              className="w-full mb-5 p-2 rounded"
              value={tipoConta}
              onChange={handleTipoContaChange}
            >
              <option value="0">Contratante</option>
              <option value="1">Prestador</option>
            </select>

            {renderCamposAdicionais()}

            <div className='flex justify-between'>
              <button
                className='bg-transparent hover:bg-yellow-500 text-black font-semibold hover:text-black py-2 px-4 border border-yellow-500 hover:border-transparent rounded'
                onClick={retrocederEtapa}>
                Etapa Anterior
              </button>
              <button
                className='bg-transparent hover:bg-purple-500 text-black font-semibold hover:text-black py-2 px-4 border border-purple-500 hover:border-transparent rounded'
                onClick={avancarEtapa}>
                Próxima Etapa
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label className="font-medium text-black">CEP:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Digite seu CEP..."
              value={endereco.cep}
              onChange={handleCEPInput}
              maxLength={8}
            />

            <label className="font-medium text-black">Rua:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Rua"
              value={endereco.rua}
              onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
              maxLength={100}
            />

            <label className="font-medium text-black">Número:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="number"
              placeholder="Número"
              value={endereco.numero}
              onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
            />

            <label className="font-medium text-black">Complemento:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Complemento"
              value={endereco.complemento}
              onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
              maxLength={100}
            />

            <label className="font-medium text-black">Bairro:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Bairro"
              value={endereco.bairro}
              onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
            />

            <label className="font-medium text-black">Cidade:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Cidade"
              value={endereco.cidade}
              onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
              maxLength={100}
            />

            <label className="font-medium text-black">Estado:</label>
            <input
              className="w-full mb-5 p-2 rounded"
              type="text"
              placeholder="Estado"
              value={endereco.estado}
              onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
              maxLength={100}
            />

            <div className='flex justify-between'>
              <button
                className='bg-transparent hover:bg-yellow-500 text-black font-semibold hover:text-black py-2 px-4 border border-yellow-500 hover:border-transparent rounded'
                onClick={retrocederEtapa}>
                Etapa Anterior
              </button>
              <a
                className='hover:cursor-pointer bg-transparent hover:bg-green-500 text-black font-semibold hover:text-black py-2 px-4 border border-green-500 hover:border-transparent rounded'
                onClick={handleSubmit}
              >
                Enviar Cadastro
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-4xl">
        <img src='https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t4-connectlocal/blob/main/src/frontend/src/images/ConnectLogo.png?raw=true'></img>
        <h1 className="text-4xl font-medium text-purple-500 mt-6">Cadastro</h1>
        <form className="flex flex-col my-6">
          {renderEtapa()}
        </form>
      </main>
    </div>
  );
}

export default Cadastro;
