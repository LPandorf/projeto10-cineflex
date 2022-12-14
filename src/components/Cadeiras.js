import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegarCadeiras } from "./Apis";
import Footer from "./Footer";
import styled from 'styled-components';

function Cadeira({ cadeira, cadeiraSelecionada }) {

    return (
        <>
            <span className={`cadeira ${cadeira.isAvailable ? '' : 'ocupada'} ${
                cadeira.selecionada ? 'selecionada' : ''
                }`}
                onClick={()=>cadeiraSelecionada(cadeira.id)}
            >
                {cadeira.nome}
            </span>
        </>
    );
}

export default function Cadeiras() {
    const [horario, setHorario] = useState({});
    const [cadeiras, setCadeiras] = useState([]);
    const [formulario, setFormulario] = useState({});
    const { horarioId } = useParams();
    const navigate = useNavigate();
    console.log(horarioId);
    function pegarFormulario({ value, nome }) {
        console.log(nome, value);
        setFormulario({ 
            ...formulario,
            [ nome ]: value,});
    }
    function enviarFormulario() {
        console.log(formulario);
        const cadeirasId = cadeiras
            .filter((value) => value.selecionada)
            .map((value) => value.id);
        navigate('/sucesso', {
            state: {
                horario,
                formulario,
                cadeirasId,
            },
        });
    }
    function cadeiraSelecionada(cadeiraId) {
        const novasCadeiras = cadeiras.map((value) => {
            if (value.id === cadeiraId && value.isAvailable) {
                return { 
                    ...value, 
                    selecionada: !value.selecionada, 
                };
            }
            return { 
                ...value, 
            };
        });
        setCadeiras([...novasCadeiras]);
    }
    useEffect(() => { 
        pegarCadeiras(horarioId).then((res) => { 
            console.log(res.data); 
            setHorario(res.data); 
            setCadeiras(res.data.seats); 
        }); 
    }, [horarioId]);

    return (
        <>
            <Selecao>
                <Titulo>Selecione o(s) assento(s)</Titulo>
                <Lista>
                    {cadeiras !== undefined
                        ? cadeiras.map((value) => (
                            <Cadeira key={value.id} cadeira={value} cadeiraSelecionada={cadeiraSelecionada} />
                        ))
                    : 'carregando...'}
                </Lista>
            </Selecao>
            <Formulario>
                <Inputinho>
                    <Titulinho>Nome do comprador:</Titulinho>
                    <input 
                        placeholder="Nome"
                        name="nome"
                        onChange={(e)=>
                            pegarFormulario({ 
                                name: e.target.name,
                                value: e.target.value,
                            })
                        }
                    ></input>
                </Inputinho>
                <Inputinho>
                    <Titulinho>CPF do comprador:</Titulinho>
                    <input
                        placeholder="CPF"
                        name="cpf"
                        onChange={(e)=>
                            pegarFormulario({
                                name: e.target.name,
                                value: e.target.value,
                            })
                        }
                    ></input>
                </Inputinho>                
            </Formulario>
            <Botaozin onClick={enviarFormulario}>
                    Reservar
                
            </Botaozin>
            {horario.filme?(
                <Footer
                    horario={horario.filme}
                    name={horario.filme}
                    diadasemana={horario.data.weekday}
                />
            ) : ('')}
        </>
    );
};


const Selecao = styled.div`
    margin-bottom: 117px;
    padding-bottom: 24px;
`;
const Titulo = styled.div`
    font-weight: bold;
    color: #247A6B;
    text-align: center;
    margin-top: 100px;
`;
const Lista = styled.div`
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    margin: 100px;
`;
const Formulario = styled.div`
    margin-top: 31px;
    padding: 0 24px;
`;
const Inputinho = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    & input{
        border-radius: 3px;
        padding: 18px;
        border: 1px solid #D4D4D4;
        height: 51px;
        font-size: 18px;
        margin-top: 6px;
    }
    $ input::placeholder {
        color: #AFAFAF;
        font-style: italic;
        font-size: 18px;
    }
`;
const Titulinho = styled.div`
    font-size: 18px;
    color: #293845;
`;
const Botaozin = styled.button`
 
        margin-top: 57px;
        width: 225px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background-color: #E8833A;
        font-size: 18px;
        border: none;
        border-radius: 3px;
        margin: 0 auto;

`;

