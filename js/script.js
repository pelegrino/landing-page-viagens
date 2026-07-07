// ============================
// BOTÃO "SOLICITAR ORÇAMENTO"
// ============================

const btnOrcamento = document.getElementById("btnOrcamento");
const formulario = document.getElementById("orcamento");

btnOrcamento.addEventListener("click", () => {
  formulario.scrollIntoView({
    behavior: "smooth",
  });
});

// ============================
// DESTINOS
// ============================

const tipoViagem = document.getElementById("tipoViagem");
const destino = document.getElementById("destino");

const destinosNacionais = ["Gramado", "Maceió", "Rio de Janeiro", "Bonito"];

const destinosInternacionais = ["França", "Portugal", "Japão", "Canadá"];

tipoViagem.addEventListener("change", () => {
  destino.innerHTML = "";

  let opcao = document.createElement("option");
  opcao.textContent = "Selecione";
  opcao.value = "";

  destino.appendChild(opcao);

  let lista = [];

  if (tipoViagem.value === "nacional") {
    lista = destinosNacionais;
  } else if (tipoViagem.value === "internacional") {
    lista = destinosInternacionais;
  }

  lista.forEach((item) => {
    const option = document.createElement("option");

    option.value = item;
    option.textContent = item;

    destino.appendChild(option);
  });
});

// ============================
// CONSULTA DO DESTINO
// ============================

const btnConsultar = document.getElementById("btnConsultar");
const cardDestino = document.getElementById("cardDestino");

btnConsultar.addEventListener("click", async () => {
  if (tipoViagem.value === "") {
    alert("Selecione o tipo da viagem.");
    return;
  }

  if (destino.value === "") {
    alert("Selecione um destino.");
    return;
  }

  if (tipoViagem.value === "nacional") {
    cardDestino.innerHTML = `
            <h3>📍 ${destino.value}</h3>

            <p>
                Viagem nacional selecionada.
            </p>

            <p>
                A consulta de clima poderá ser implementada
                futuramente utilizando uma API.
            </p>
        `;

    return;
  }

  try {
    const resposta = await fetch(
      `https://restcountries.com/v3.1/name/${destino.value}?fullText=true`,
    );

    const dados = await resposta.json();

    const pais = dados[0];

    const idioma = Object.values(pais.languages)[0];
    const moeda = Object.values(pais.currencies)[0];

    cardDestino.innerHTML = `

            <img
                src="${pais.flags.png}"
                alt="Bandeira"
                width="120"
            >

            <h3>${pais.name.common}</h3>

            <p><strong>Capital:</strong> ${pais.capital[0]}</p>

            <p><strong>Continente:</strong> ${pais.region}</p>

            <p><strong>Idioma:</strong> ${idioma}</p>

            <p><strong>Moeda:</strong> ${moeda.name}</p>

            <p>
                <strong>Símbolo:</strong>
                ${moeda.symbol ?? "-"}
            </p>

            <p>
                Cotação e clima serão adicionados
                na próxima versão.
            </p>

        `;
  } catch (erro) {
    cardDestino.innerHTML = `

            <p>

                Não foi possível consultar
                esse destino.

            </p>

        `;
  }
});

// ============================
// ENVIO DO FORMULÁRIO
// ============================

const form = document.getElementById("formOrcamento");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("Solicitação enviada com sucesso!");

  form.reset();

  destino.innerHTML = `
        <option>
            Selecione o tipo da viagem
        </option>
    `;

  cardDestino.innerHTML = `
        <p>
            Selecione um destino e clique em
            <strong>Consultar destino</strong>.
        </p>
    `;
});
