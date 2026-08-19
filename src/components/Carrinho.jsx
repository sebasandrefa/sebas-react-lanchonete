function Carrinho({
  carrinho,
  limparCarrinho,
  finalizarPedido
}) {
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) =>
      total + item.preco * item.quantidade,
    0
  );

  return (
    <div className="carrinho">

      <h3>🛒 Carrinho de compras</h3>

      {carrinho.length === 0 ? (
        <p className="carrinho-vazio">
          O carrinho está vazio.
        </p>
      ) : (
        <div className="itens-carrinho">

          {carrinho.map((item) => (
            <div
              className="item-carrinho"
              key={item.id}
            >
              <img
                src={item.imagem}
                alt={item.nome}
              />

              <div className="item-info">
                <strong>{item.nome}</strong>

                <span>
                  {item.quantidade}x
                </span>
              </div>

              <strong>
                R$ {(item.preco * item.quantidade)
                  .toFixed(2)
                  .replace(".", ",")}
              </strong>
            </div>
          ))}

        </div>
      )}

      <div className="resumo-carrinho">

        <div>
          <span>Total de itens</span>
          <strong>{totalItens}</strong>
        </div>

        <div>
          <span>Valor total</span>

          <strong>
            R$ {valorTotal
              .toFixed(2)
              .replace(".", ",")}
          </strong>
        </div>

      </div>

      <div className="botoes-carrinho">

        <button
          className="btn-limpar"
          onClick={limparCarrinho}
        >
          🗑 Limpar
        </button>

        <button
          className="btn-finalizar"
          onClick={finalizarPedido}
          disabled={carrinho.length === 0}
        >
          Finalizar
        </button>

      </div>

    </div>
  );
}

export default Carrinho;