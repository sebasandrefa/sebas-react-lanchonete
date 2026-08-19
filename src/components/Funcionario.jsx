function Funcionario({
  pedidos,
  alterarStatusPedido,
  voltarCardapio
}) {

  return (
    <div className="cozinha-container">

      <div className="cozinha-header">

        <div>

          <h2>
            👨‍🍳 Pedidos da Cozinha
          </h2>

          <p>
            Fila de produção em tempo real
          </p>

        </div>

        <button onClick={voltarCardapio}>
          ← Voltar ao cardápio
        </button>

      </div>


      {pedidos.length === 0 ? (

        <div className="nenhum-pedido">

          Nenhum pedido na fila. Finalize um
          carrinho no cardápio para enviar
          pedidos à cozinha.

        </div>

      ) : (

        <div className="lista-pedidos">

          {pedidos.map((pedido) => (

            <div
              className="pedido"
              key={pedido.id}
            >

              <div className="pedido-header">

                <div>

                  <h3>
                    Pedido #{String(pedido.id).slice(-5)}
                  </h3>

                  <small>
                    {pedido.itens.length} produto(s)
                  </small>

                </div>

                <span
                  className={`status status-${pedido.status.toLowerCase()}`}
                >
                  {pedido.status}
                </span>

              </div>


              <div className="pedido-itens">

                {pedido.itens.map((item) => (

                  <div
                    className="pedido-item"
                    key={item.id}
                  >

                    <span>
                      {item.quantidade}x{" "}
                      {item.nome}
                    </span>

                    <strong>
                      R${" "}
                      {(item.preco * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </strong>

                  </div>

                ))}

              </div>


              <div className="pedido-total">

                <span>
                  Total
                </span>

                <strong>
                  R$ {pedido.total
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>

              </div>


              {/* STATUS */}

              <div className="status-flow">

                <button
                  className={
                    pedido.status === "Recebido"
                      ? "status-ativo"
                      : ""
                  }
                  onClick={() =>
                    alterarStatusPedido(
                      pedido.id,
                      "Recebido"
                    )
                  }
                >
                  Recebido
                </button>

                <span>→</span>

                <button
                  className={
                    pedido.status === "Preparando"
                      ? "status-ativo preparando"
                      : ""
                  }
                  onClick={() =>
                    alterarStatusPedido(
                      pedido.id,
                      "Preparando"
                    )
                  }
                >
                  Preparando
                </button>

                <span>→</span>

                <button
                  className={
                    pedido.status === "Pronto"
                      ? "status-ativo pronto"
                      : ""
                  }
                  onClick={() =>
                    alterarStatusPedido(
                      pedido.id,
                      "Pronto"
                    )
                  }
                >
                  Pronto
                </button>

                <span>→</span>

                <button
                  className={
                    pedido.status === "Entregue"
                      ? "status-ativo entregue"
                      : ""
                  }
                  onClick={() =>
                    alterarStatusPedido(
                      pedido.id,
                      "Entregue"
                    )
                  }
                >
                  Entregue
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Funcionario;