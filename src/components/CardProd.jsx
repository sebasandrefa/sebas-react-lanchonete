function CardProd({ produto, adicionarCarrinho }) {
  return (
    <div className="card-produto">

      <img
        src={produto.imagem}
        alt={produto.nome}
      />

      <span className="categoria">
        {produto.categoria}
      </span>

      <h3>
        {produto.nome}
      </h3>

      <p>
        {produto.descricao}
      </p>

      <div className="produto-bottom">

        <strong>
          R$ {produto.preco.toFixed(2).replace(".", ",")}
        </strong>

        <button
          onClick={() => adicionarCarrinho(produto)}
        >
          Adicionar
        </button>

      </div>

    </div>
  );
}

export default CardProd;