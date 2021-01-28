/**
 * 
 * @param {Array} gerenciamento 
 */
module.exports = function initControleEstoque(gerenciamento){
    const controleEstoque = {
        // Recebe a mesma lista de produtos de gerenciamento
        produtos: gerenciamento,
        btnAdicionarEstoque: document.querySelector('#adicionarEstoque'),
        btnPesquisar: document.querySelector('.controleEstoque #pesquisar'),
        btnRemoverEstoque: document.querySelector('#removerEstoque'),
        tabela: document.querySelector('.controleEstoque tbody'),

        adicionarEstoque: ()=>{
            console.log(controleEstoque.produtos);
            controleEstoque.renderizar();
        },

        calcularLucroEstimado: (qtde,precoCusto,precoVenda)=>{
            const quantidade = parseInt(qtde);
            const precoC = parseFloat(precoCusto);
            const precoV = parseFloat(precoVenda);

            return ((quantidade*precoV) - (quantidade*precoC));
        },

        pegarDados: ()=>{
            const dadosProdutos = [];

            gerenciamento.forEach(item => {
                console.log(item);
                const quantidade = item.children[5].children[0].value;
                const custo = item.children[3].children[0].value;
                const venda = item.children[4].children[0].value;

                const produto = {
                    nome: item.children[1].children[0].value,
                    qtdEstoque: quantidade,
                    precoCusto: custo,
                    precoVenda: venda,
                    lucroEstimado: controleEstoque.calcularLucroEstimado(quantidade, custo, venda)
                }

                // Adicionando dados do produto
                dadosProdutos.push(produto);
            });

            return dadosProdutos;
        },

        renderizar: ()=>{
            const dados = controleEstoque.pegarDados();

            console.log('Criando Elemento na Tabela');
            const tr = document.createElement('tr');


            dados.forEach(dado => {
                console.log("Iniciando");
                const novoProduto = {
                    nome: document.createElement('td'),
                    preco_custo: document.createElement('td'),
                    preco_venda: document.createElement('td'),
                    quantidade: document.createElement('td'),
                    lucro_estimado: document.createElement('td')
                }

                novoProduto.nome.innerText = dado.nome;
                novoProduto.quantidade.innerText = dado.qtdEstoque;
                novoProduto.preco_custo.innerText = dado.precoCusto;
                novoProduto.preco_venda.innerText = dado.precoVenda;
                novoProduto.lucro_estimado.innerText = dado.lucroEstimado;
    
                tr.setAttribute('class','linha');
                tr.appendChild(novoProduto.nome);
                tr.appendChild(novoProduto.quantidade);
                tr.appendChild(novoProduto.preco_custo);
                tr.appendChild(novoProduto.preco_venda);
                tr.appendChild(novoProduto.lucro_estimado);    
                
                controleEstoque.tabela.appendChild(tr);
            })
            
        }

    }

    controleEstoque.btnAdicionarEstoque.addEventListener('click',controleEstoque.adicionarEstoque);

    return controleEstoque;
}