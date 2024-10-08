import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFilme } from "../api/filme"
import Loader from "../components/Loader"
import { deleteFilme } from "../api/filme"
import toast from "react-hot-toast";


const Filmes = () => {
  const [filmes, setFilmes] = useState(null);

  function carregarFilmes() {
    getFilme().then((dados) => {
      console.log(dados);
      setFilmes(dados);
    })
  }

  function deletarFilme(id){
    const deletar = confirm("Tem certeza que deseja excluir o filme ?")
    if(deletar) {
      deleteFilme(id)
      .then((resposta) => {
        toast.success(resposta.message);
        carregarFilmes();
      })}};

  useEffect(() => {
    carregarFilmes();
  }, [])

  return (
    <main className="mt-4 container">
      <h1>Filmes</h1>
      <Button as={Link} to="/filme/novo">
        Adicionar Filme
      </Button>
      <hr />
      {
        filmes ? 
        <Table>
                    <thead>
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Lançamento</th>
              <th>Ação</th>
            </tr>
            {
              filmes.map( (filme) => {
                return (
                  <tr key={filme.id}>
                    <td>{ filme.id }</td>
                    <td>{ filme.titulo }</td>
                    <td>{ filme.descricao }</td>
                    <td>{ filme.data_lancamento ? new Date(filme.data_lancamento+"T00:00:00").toLocaleDateString() : "-" }</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" variant="danger" as={Link} className="mx-2" onClick={()=> deletarFilme(filme.id)}>Excluir</Button>
                        <Button size="sm" as={Link} to={`/filme/editar/${filme.id}`}>
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </thead>
        </Table>:
        <Loader />
      }

    </main>
  )
}

export default Filmes