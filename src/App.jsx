import { useState } from "react";
import {
  ShoppingCart,
  ChefHat,
  UtensilsCrossed,
  Trash2,
  ArrowRight,
  LogIn,
} from "lucide-react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "X-Salada",
    category: "Lanches",
    description: "Hambúrguer artesanal, queijo, alface e tomate.",
    price: 17.5,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "X-Burguer",
    category: "Lanches",
    description: "Dois hambúrgueres e cheddar derretido no pão brioche.",
    price: 15.9,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "X-Egg",
    category: "Lanches",
    description: "Hambúrguer com ovo frito e maionese da casa.",
    price: 17.5,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Batata Frita",
    category: "Porções",
    description: "Porção crocante com sal marinho.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Refrigerante",
    category: "Bebidas",
    description: "Lata 350ml bem gelada.",
    price: 8,
    image:
      "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Cookie",
    category: "Sobremesas",
    description: "Cookie recheado com gotas de chocolate.",
    price: 9.5,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
];

const team = [
  ["Felipe", "Garçom", "Turno Manhã"],
  ["Luiz", "Chapeiro", "Turno Tarde"],
  ["Sebastian", "Segurança", "Turno Noite"],
  ["Peruzzo", "CEO", "Turno Integral"],
];

function App() {
  const [view, setView] = useState("menu");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [role, setRole] = useState(null);

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const finishOrder = () => {
    if (cart.length === 0) {
      alert("Adicione produtos ao carrinho primeiro.");
      return;
    }

    const items = cart.reduce((groupedItems, item) => {
      const existingItem = groupedItems.find(
        (groupedItem) => groupedItem.id === item.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        groupedItems.push({ ...item, quantity: 1 });
      }

      return groupedItems;
    }, []);

    setOrders((currentOrders) => [
      ...currentOrders,
      {
        id: Date.now(),
        items,
        total,
        status: "Recebido",
      },
    ]);
    setCart([]);
    setView("kitchen");
  };

  const updateOrderStatus = (orderId, status) => {
    if (status === "Entregue") {
      setOrders((currentOrders) =>
        currentOrders.filter((order) => order.id !== orderId),
      );
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const handleLogin = () => {
    const username = user.trim().toLowerCase();

    if (password !== "123") {
      setLoginMessage("Usuário ou senha inválidos.");
      return;
    }

    if (username === "cliente") {
      setRole("cliente");
      setLoginMessage("Login de cliente realizado. Bom pedido!");
      setView("menu");
      return;
    }

    if (username === "admin") {
      setRole("admin");
      setLoginMessage("Login de administrador realizado.");
      setView("kitchen");
      return;
    }

    setLoginMessage("Usuário ou senha inválidos.");
  };

  const toggleKitchenView = () => {
    if (view === "kitchen") {
      setView("menu");
      return;
    }

    if (role !== "admin") {
      setLoginMessage("Entre como admin para acessar a cozinha.");
      return;
    }

    setView("kitchen");
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="brand-small">
            <UtensilsCrossed size={20} />
            <span>DESDE 1998</span>
          </div>

          <h1>Lanchonete Sebas</h1>

          <p>
            O melhor da região. Cardápio digital, carrinho de compras e
            pedidos direto para a chapa.
          </p>
        </div>

        <button
          className="kitchen-button"
          onClick={toggleKitchenView}
        >
          {view === "menu" ? (
            <>
              <ChefHat size={17} />
              Painel da cozinha
            </>
          ) : (
            <>
              <ArrowRight size={17} />
              Voltar ao cardápio
            </>
          )}
        </button>
      </header>

      {view === "menu" ? (
        <main className="main-container">
          <section className="menu-section">
            <div className="section-title">
              <h2>Cardápio</h2>
              <span>{products.length} itens</span>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <span className="category">{product.category}</span>

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </strong>

                    <button onClick={() => addToCart(product)}>
                      Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <section className="team-section">
              <h2>Nossa equipe</h2>

              <div className="team-grid">
                {team.map(([name, role, shift]) => (
                  <div className="team-card" key={name}>
                    <h3>{name}</h3>
                    <p>{role}</p>
                    <span>{shift}</span>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="sidebar">
            <div className="login-card">
              <h2>Acesso da equipe</h2>

              <label>Usuário</label>
              <input
                type="text"
                placeholder="seu.usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="login-button" onClick={handleLogin}>
                <LogIn size={17} />
                Entrar
              </button>

              {loginMessage && (
                <p className="login-message" role="status">
                  {loginMessage}
                </p>
              )}

              <a href="#senha">Esqueceu a senha?</a>
            </div>

            <div className="cart-card">
              <div className="cart-title">
                <ShoppingCart size={21} />
                <h2>Carrinho de compras</h2>
              </div>

              {cart.length === 0 ? (
                <p className="empty-cart">O carrinho está vazio.</p>
              ) : (
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.id}-${index}`}>
                      <div>
                        <strong>{item.name}</strong>
                        <small>
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </small>
                      </div>

                      <button onClick={() => removeFromCart(index)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="cart-summary">
                <div>
                  <span>Total de itens</span>
                  <strong>{cart.length}</strong>
                </div>

                <div className="total">
                  <span>Valor total</span>
                  <strong>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </strong>
                </div>
              </div>

              <div className="cart-buttons">
                <button
                  className="clear-button"
                  onClick={() => setCart([])}
                >
                  <Trash2 size={16} />
                  Limpar
                </button>

                <button className="finish-button" onClick={finishOrder}>
                  Finalizar
                </button>
              </div>
            </div>
          </aside>
        </main>
      ) : (
        <main className="kitchen-page">
          <div className="kitchen-header">
            <div>
              <ChefHat size={35} />
              <div>
                <h1>Pedidos da Cozinha</h1>
                <p>Fila de produção em tempo real</p>
              </div>
            </div>

            <button onClick={() => setView("menu")}>
              Voltar ao cardápio
            </button>
          </div>

          <div className="orders-box">
            {orders.length === 0 ? (
              <p>
                Nenhum pedido na fila. Finalize um carrinho no cardápio para
                enviar pedidos à cozinha.
              </p>
            ) : (
              <div className="orders">
                {orders.map((order) => (
                  <section className="kitchen-order" key={order.id}>
                    <div className="kitchen-order-header">
                      <h2>Pedido #{String(order.id).slice(-5)}</h2>
                      <span className="order-status">{order.status}</span>
                    </div>

                    {order.items.map((item) => (
                      <div className="order-item" key={item.id}>
                        <strong>{item.quantity}x {item.name}</strong>
                        <span>
                          R$ {(item.price * item.quantity)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                    ))}

                    <div className="order-total">
                      <strong>Total</strong>
                      <strong>R$ {order.total.toFixed(2).replace(".", ",")}</strong>
                    </div>

                    <div className="order-actions" aria-label="Status do pedido">
                      {["Recebido", "Preparando", "Pronto", "Entregue"].map(
                        (status) => (
                          <button
                            className={order.status === status ? "active" : ""}
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                          >
                            {status}
                          </button>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          <div className="status-box">
            <h2>Fluxo de status</h2>

            <div className="status-flow">
              <span>Recebido</span>
              <ArrowRight size={18} />
              <span className="active-yellow">Preparando</span>
              <ArrowRight size={18} />
              <span className="active-green">Pronto</span>
              <ArrowRight size={18} />
              <span>Entregue</span>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
