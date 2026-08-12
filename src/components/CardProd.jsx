import "./CardProd.css";

function CardProd({ produto, adicionar }) {
  return (
    <div className="card-produto">
      <img
        src={produto.imagem}
        alt={produto.nome}
      />

      <h3>{produto.nome}</h3>

      <p>
        R${" "}
        {Number(produto.preco)
          .toFixed(2)
          .replace(".", ",")}
      </p>

      <button onClick={() => adicionar(produto)}>
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default CardProd;