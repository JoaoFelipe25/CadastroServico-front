import React, { useEffect, useState} from 'react';
import axios from 'axios';

import Nav from "./nav";


function Formulario(){

    const [servico, setServico] = useState({nomeCliente:"", dataInicio:"",dataTermino:"",descricaoServico:"",valorServico:"",valorPago:"", dataPagamento:""})

    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(()=>{
       buscarTodos();
       
    },[atualizar]);

    function handleChange(event){
        setServico({...servico,[event.target.name]:event.target.value}); 
    }

    function buscarTodos(event){
        axios.get("http://localhost:8080/api/servico/").then(result =>{
            setServicos(result.data); 
            
        });

    }

    function pagamentoPendente(){
        axios.get("http://localhost:8080/api/servico/pagamentoPendente").then(result =>{
            setServicos(result.data); 
            
        });
    }

    function buscarCancelado(){
        axios.get("http://localhost:8080/api/servico/cancelado").then(result =>{
            setServicos(result.data); 
            
        });
    }

    function limpar(){
        setServico({nomeCliente:"", dataInicio:"",dataTermino:"",descricaoServico:"",valorServico:"",valorPago:"", dataPagamento:""});

    }

    function handleSubmit(event){  
        event.preventDefault();

        if(servico.id == undefined){

            axios.post("http://localhost:8080/api/servico/", servico).then(result =>{
            setAtualizar(result);
            })

        }else{

            axios.put("http://localhost:8080/api/servico/", servico).then(result =>{
            setAtualizar(result);
            })

            }
        
        limpar();
        console.log(servico.dataInicio)
    }

    function excluir(id){
        axios.delete("http://localhost:8080/api/servico/" + id).then(result =>{
            setAtualizar(result);
        });
    }

    function cancelar(id){
        axios.post("http://localhost:8080/api/servico/" + id).then(result =>{
            setAtualizar(result);
        });
    
    }

    return(

        <div className='servico'>

            <Nav/>

            <h1 className='title-form'>Cadastrar Serviços</h1>

            <form className='form-servico' onSubmit={handleSubmit}>

                <div>

                    <div className='campo-servico'>
                        <label>Nome do Cliente</label>
                        <input className='input-servico' onChange={handleChange} value={servico.nomeCliente || ''} name="nomeCliente" type="text" />
                    </div>

                    <div className='campo-servico'>
                        <label>Data do Inicio</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio"  type="date"/>
                    </div>

                    <div className='campo-servico'>
                        <label>Data de Termino</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino"  type="date" />
                    </div>

                    <div className='campo-servico'>
                        <label>Descrição do Serviço</label>
                        <input className='input-servico' onChange={handleChange} value={servico.descricaoServico || ''} name="descricaoServico" type="text" />
                    </div>

                    <div className='campo-servico'>
                        <label>Valor do Serviço</label>
                        <input className='input-servico' onChange={handleChange} value={servico.valorServico || ''} name="valorServico" type="number" />
                    </div>

                    <div className='campo-servico'>
                        <label>Valor Pago</label>
                        <input className='input-servico' onChange={handleChange} value={servico.valorPago || ''} name="valorPago" type="number" />
                    </div>

                    <div className='campo-servico'>
                        <label>Data de Pagamento</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataPagamento || ''} name="dataPagamento" type="date" />
                    </div>

                    <div className='button-form'>

                        <input type="submit" value='Cadastrar'/>

                        <button onClick={limpar}>Limpar</button>

                    </div>
                   

                </div>

            </form>

            <div className='button-buscas'>

                <button onClick={buscarTodos} className='todos'>Listar Todos</button>
                <button onClick={pagamentoPendente} className='pendente' >Pagamentos Pendente</button>
                <button onClick={buscarCancelado} className='cancelado' >Serviços Cancelados</button>

            </div>
            
            
            <table>
                <thead>

                    <tr>
                        <th>Cliente</th>
                        <th>Data Inicio</th>
                        <th>Data Termino</th>
                        <th>Descrição Serviço</th>
                        <th>Valor do Serviço</th>
                        <th>valor Pago</th>
                        <th>Data de Pagamento</th>
                        <th>Status</th>
                        <th>Opções  </th>
                        
                    </tr>

                </thead>

                <tbody className='resposta'>

                    {servicos.map(serv => (

                        <tr key={serv.id} >
                
                            <td>{serv.nomeCliente}</td>
                            <td>{serv.dataInicio}</td>
                            <td>{serv.dataTermino}</td>
                            <td>{serv.descricaoServico}</td>
                            <td>{serv.valorServico}</td>
                            <td>{serv.valorPago}</td>
                            <td>{serv.dataPagamento}</td>
                            <td>{serv.status}</td>
                            <td className='button-resposta'>
                                <button onClick={()=>setServico(serv)} className='todos'>Alterar</button>
                                <button onClick={()=>excluir(serv.id)} className='excluir'>Excluir</button>
                                <button onClick={()=>cancelar(serv.id)} className='cancelado'>Cancelar</button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            
            <br/>
            
        </div>
    )
}

export default Formulario