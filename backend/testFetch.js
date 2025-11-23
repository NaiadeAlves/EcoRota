import fetch from "node-fetch";

async function test() {
  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "teste@teste.com", password: "123" })
    });

    const data = await res.json();
    console.log("Resposta do backend:", data);
  } catch (err) {
    console.error("Erro ao acessar backend:", err);
  }
}

test();
