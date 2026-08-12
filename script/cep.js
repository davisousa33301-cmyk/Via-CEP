// URL da API

const ceps = JSON.parse(localStorage.getItem("ceps")) || []

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

        ceps.push(cep)

        console.log(ceps)

        
        const texto = JSON.stringify(ceps);
        localStorage.setItem("ceps", texto);

        mostrarHistorico()


        console.log(localStorage.getItem("ceps"));

        vetor.forEach((campo) => { 

            console.log(posts[campo])

            const resultado = document.createElement ("p")
            resultado.textContent = `${campo}: ${posts[campo]}`

            const api = document.getElementById("result")

            api.appendChild(resultado)

         })

      

    } catch (error) {
        const container = document.getElementById("erro")
        console.error('Erro ao buscar cep:', error);
        container.innerHTML = '<p style="color: red;">Endereço não encontrado.</p>';
    }

}

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

mostrarHistorico()

function limpar()
{
    document.getElementById("cep").value = ""
    document.getElementById("result").innerHTML = ""
    localStorage.removeItem("ceps")
    ceps.length = 0
    document.getElementById("historico").innerHTML = ""
}


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

        if (posts.length == 0)
        {
            const container = document.getElementById("erro")
            console.error('Erro ao buscar cep:');
            container.innerHTML = '<p style="color: red;">Endereço não existente.</p>';
        }

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
            const container = document.getElementById("erro")
            console.error('Erro ao buscar cep:', error);
            container.innerHTML = '<p style="color: red;">Endereço não encontrado.</p>';
        }

    }
    
    
    


