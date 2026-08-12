// Tenta buscar no armazenamento do navegador (localStorage) os CEPs já pesquisados. 
// Se não tiver nada, cria um array vazio.

const ceps = JSON.parse(localStorage.getItem("ceps")) || []

// Pega o número digitado e consulta a API ViaCEP. 
// Se der certo, salva no histórico e exibe os detalhes (rua, bairro, etc) na tela.
async function pegarCep()
{

    let cep = document.getElementById("cep").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(url)


    try {

        const api = document.getElementById("result")
        const infoApi = document.createElement("h1")
        infoApi.textContent = "Informações da API"
        api.appendChild(infoApi)
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const posts = await response.json();

        console.log(posts);

        const vetor = ["logradouro", "complemento", "bairro", "localidade", "uf"]

        posts[vetor]

        // Adiciona o CEP atual na nossa lista e atualiza o localStorage
        ceps.push(cep)

        console.log(ceps)

        
        const texto = JSON.stringify(ceps);
        localStorage.setItem("ceps", texto);

        mostrarHistorico()


        console.log(localStorage.getItem("ceps"));

        // Cria os parágrafos com as informações e joga na div de resultado
        vetor.forEach((campo) => { 

            console.log(posts[campo])

            const resultado = document.createElement ("p")
            resultado.textContent = `${campo}: ${posts[campo]}`

            const api = document.getElementById("result")

            api.appendChild(resultado)

         })

      
    // Se a API der erro, exibe uma mensagem vermelha na tela
    } catch (error) {
        const container = document.getElementById("erro")
        console.error('Erro ao buscar cep:', error);
        container.innerHTML = '<p style="color: red;">Endereço não encontrado.</p>';
    }

}

// Limpa a lista atual, pega os últimos 3 CEPs pesquisados e cria parágrafos clicáveis.
// Ao clicar num CEP do histórico, ele já refaz a busca automaticamente.
function mostrarHistorico()
{
    const lista = document.getElementById("historico")
    lista.innerHTML = ""

    const titulo = document.createElement("h1")
    titulo.textContent = "Histórico de CEPs"
    lista.appendChild(titulo)


    ceps.slice(-3).forEach((cepSalvo) => 
    {   
        const historico = document.createElement("p")
        historico.textContent = cepSalvo

        historico.onclick = function() {
        document.getElementById("cep").value = cepSalvo
        pegarCep()
        }

        lista.appendChild(historico)

    })
}

// Chama a função assim que a página carrega
mostrarHistorico()

// Apaga o campo de texto, os resultados na tela, o histórico salvo e zera o array.
function limpar()
{
    document.getElementById("cep").value = ""
    document.getElementById("result").innerHTML = ""
    localStorage.removeItem("ceps")
    ceps.length = 0
    document.getElementById("historico").innerHTML = ""
}

// Pega os dados de Estado, Cidade e Rua e busca na API qual é o CEP correspondente.
async function buscarCep()
{
    let uf = document.getElementById("estado").value;
    let cidade = document.getElementById("cidade").value;
    let log = document.getElementById("logradouro").value;

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${log}/json/`;
    console.log(url)
   

    try 
    {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const posts = await response.json();

        console.log(posts);

        // Se a API retornar vazio, avisa que o endereço não existe
        if (posts.length == 0)
        {
            const container = document.getElementById("erro")
            console.error('Erro ao buscar cep:');
            container.innerHTML = '<p style="color: red;">Endereço não existente.</p>';
        }

        // Se achou, lista os CEPs retornados na div de resultado
        posts.forEach((endereco) => { 

            console.log(endereco.cep)

            console.log(endereco);

            const resultado = document.createElement ("p")
            resultado.textContent = endereco.cep;
            const api = document.getElementById("result")

            api.appendChild(resultado)
         })

    } 


        catch (error) 
        {
            // Se der erro na rede ou na API, exibe a mensagem de erro
            const container = document.getElementById("erro")
            console.error('Erro ao buscar cep:', error);
            container.innerHTML = '<p style="color: red;">Endereço não encontrado.</p>';
        }

    }
    
    
    


