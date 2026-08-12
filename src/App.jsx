import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import CardProd from "./components/CardProd";
import Funcionario from "./components/Funcionario";
import Calculadora from "./components/Calculadora";
import "./App.css";

function App() {
  const [carrinho, setCarrinho] = useState([]);



  const lanches = [
    {
      id: 1,
      nome: "X-salada",
      preco: "17.50",
      imagem: "/images/x-salada.jpg",
    },
    {
      id: 2,
      nome: "X-burguer",
      preco: "15.90",
      imagem: "/images/x-Burguer.jpg",
    },
    {
      id: 3,
      nome: "X-egg",
      preco: "17.50",
      imagem: "/images/x-egg.png",
    },
    {
      id: 4,
      nome: "Batata",
      preco: "16.90",
      imagem: "/images/batatas.png",
    },
    {
      id: 5,
      nome: "Refrigerante",
      preco: "6.00",
      imagem: "/images/refrigerante.jpg",
    },
    {
      id: 6,
      nome: "Água",
      preco: "5.50",
      imagem: "/images/agua.png",
    },
    {
      id: 7,
      nome: "Sorvete",
      preco: "7.00",
      imagem: "/images/Sorvete.jpg",
    },
    {
      id: 8,
      nome: "Cookie",
      preco: "8.00",
      imagem: "/images/cookie.png",
    },
  ];



  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExiste = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (produtoExiste) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        );
      }

      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }



  function removerDoCarrinho(id) {
    setCarrinho((carrinhoAtual) => {
      return carrinhoAtual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0);
    });
  }



  const funcionario = [
    {
      id: 1,
      nome: "Felipe",
      cargo: "Garçom",
    },
    {
      id: 2,
      nome: "Luiz",
      cargo: "Chapeiro",
    },
    {
      id: 3,
      nome: "Sebastian",
      cargo: "Segurança",
    },
    {
      id: 4,
      nome: "Peruzzo",
      cargo: "CEO",
    },
  ];



  return (
    <>
      <Header
        titulo="Lanchonete"
        subtitulo="O melhor da região"
      />

      <Login />



      <div className="lista_cards">
        {lanches.map((lanche) => (
          <CardProd
            key={lanche.id}
            produto={lanche}
            adicionar={adicionarAoCarrinho}
          />
        ))}
      </div>



      <div className="carrinho">
        <h2>CARRINHO DE COMPRAS</h2>

        <hr />

        {carrinho.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          carrinho.map((item) => (
            <div
              className="item-carrinho"
              key={item.id}
            >
              <img
                src={item.imagem}
                alt={item.nome}
              />

              <span>{item.nome}</span>

              <span>
                Qtde: {item.quantidade}
              </span>

              <span>
                R${" "}
                {(
                  Number(item.preco) *
                  item.quantidade
                )
                  .toFixed(2)
                  .replace(".", ",")}
              </span>

              <button
                onClick={() =>
                  removerDoCarrinho(item.id)
                }
              >
                Remover
              </button>
            </div>
          ))
        )}

        <hr />

        <p>
          Total de itens:{" "}
          {carrinho.reduce(
            (total, item) =>
              total + item.quantidade,
            0
          )}
        </p>

        <p>
          Valor Total: R${" "}
          {carrinho
            .reduce(
              (total, item) =>
                total +
                Number(item.preco) *
                  item.quantidade,
              0
            )
            .toFixed(2)
            .replace(".", ",")}
        </p>
      </div>


      <div className="class_funcionario">
        {funcionario.map((func) => (
          <Funcionario
            key={func.id}
            nome={func.nome}
            cargo={func.cargo}
          />
        ))}
      </div>

      <Calculadora />
    </>
  );
}

export default App;