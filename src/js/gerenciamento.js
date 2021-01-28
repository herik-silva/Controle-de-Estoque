module.exports = function initGerenciamento(){
    // Objeto com todas as interações com a parte de gerenciamento de proutos
    const gerenciamento = {
        elementoAlerta: {
            container: document.querySelector('.alerta'),
            nomeProduto: document.getElementById('nomeProduto'),
            botoes: {
                remover: document.querySelector('.remover'),
                cancelar: document.querySelector('.cancelar')
            }
        },
        elementoSelecionado: null,
        produtos: [],
        produtoSelecionado: null,
        tabela: document.querySelector('table'),
        ultimoId: 0,

        btnNovoProduto: document.getElementById('novoProduto'),
        btnRemoverProduto: document.getElementById('removerProduto'),
        txt_pesquisa: document.getElementById('txt_pesquisa'),
        btnPesquisar: document.getElementById('pesquisar'),
        btnLimparPesquisa: document.getElementById('limparBusca'),

        novoProduto: ()=>{
            const produto = {
                codigo: "Ex: 0001",
                nome:"Nome do Produto",
                marca: "Marca do Produto",
                preco_custo: "Ex: 5,00",
                preco_venda: "Ex: 7,00",
                quantidade: "Ex: 10"
            }

            gerenciamento.adicionarProduto(produto);
        },

        adicionarProduto: (produto)=>{
            const MAX_INPUTS = 6;
            const inputs = [];
            const valores = [
                produto.codigo, 
                produto.nome, 
                produto.marca, 
                produto.preco_custo,
                produto.preco_venda,
                produto.quantidade
            ];

            const novoProduto = {
                codigo: document.createElement('td'),
                nome: document.createElement('td'),
                marca: document.createElement('td'),
                preco_custo: document.createElement('td'),
                preco_venda: document.createElement('td'),
                quantidade: document.createElement('td')
            }
            
            for(let i=0; i<MAX_INPUTS; i++){
                const input = document.createElement('input');
                input.setAttribute('class','input');
                input.setAttribute('type','text');
                input.placeholder = valores[i];

                inputs.push(input);
            }

            // Inserindo inputs dentro de cada elemento
            novoProduto.codigo.appendChild(inputs[0]);
            novoProduto.nome.appendChild(inputs[1]);
            novoProduto.marca.appendChild(inputs[2]);
            novoProduto.preco_custo.appendChild(inputs[3]);
            novoProduto.preco_venda.appendChild(inputs[4]);
            novoProduto.quantidade.appendChild(inputs[5]);

            // Inserindo as colunas na tabela
            const tr = document.createElement('tr');
            tr.id = gerenciamento.ultimoId++;
            tr.setAttribute('class','linha');
            tr.appendChild(novoProduto.codigo);
            tr.appendChild(novoProduto.nome);
            tr.appendChild(novoProduto.marca);
            tr.appendChild(novoProduto.preco_custo);
            tr.appendChild(novoProduto.preco_venda);
            tr.appendChild(novoProduto.quantidade);

            tr.addEventListener('click',()=>{
                if(gerenciamento.elementoSelecionado != null){
                    gerenciamento.elementoSelecionado.style.background = 'initial';
                }
                gerenciamento.produtoSelecionado = tr.id;
                gerenciamento.elementoSelecionado = tr;
                tr.style.backgroundColor = '#252525';
                console.log("ID Selecionado: "+gerenciamento.produtoSelecionado);
                console.log(gerenciamento.elementoSelecionado);
            });

            const table = document.querySelector('tbody');
            table.appendChild(tr);

            table.scrollIntoView(false);

            gerenciamento.produtos.push(tr);

        },

        removerProduto: (id)=>{
            gerenciamento.produtos.forEach((produto, index)=>{
                if(produto.id == id){
                    console.log(produto);
                    for(let i=index; i<gerenciamento.produtos.length; i++){
                        gerenciamento.produtos[i] = gerenciamento.produtos[i+1];
                    }

                    document.querySelector('tbody').removeChild(gerenciamento.elementoSelecionado);
                    gerenciamento.produtos.pop();
                    gerenciamento.elementoSelecionado = null;
                    return
                }
            })
        },

        alerta: (produto)=>{
            console.log("Alerta!");
            console.log(produto.children[1].children[0].value);
            gerenciamento.elementoAlerta.container.style.display = 'flex';
            for(let i=0; i<gerenciamento.elementoAlerta.container.childElementCount; i++){
                gerenciamento.elementoAlerta.container.children[i].style.display = 'flex';
            }

            setTimeout(()=>{
                gerenciamento.elementoAlerta.container.style.height = '25%';
            },0);

            gerenciamento.elementoAlerta.nomeProduto.innerText = produto.children[1].children[0].value || "Produto sem nome!";
        },

        fecharAlerta: ()=>{
            gerenciamento.elementoAlerta.container.style.height = '0%';

            for(let i=0; i<gerenciamento.elementoAlerta.container.childElementCount; i++){
                gerenciamento.elementoAlerta.container.children[i].style.display = 'none';
            }
    
            setTimeout(()=>{
                gerenciamento.elementoAlerta.container.style.display = 'none';
            },300);
        },

        mostrarInput: ()=>{
            gerenciamento.btnPesquisar.style.borderBottomLeftRadius = '0px';
            gerenciamento.btnPesquisar.style.borderTopLeftRadius = '0px';
            gerenciamento.btnPesquisar.style.borderLeft = 'none';
            gerenciamento.txt_pesquisa.style.border = '1px solid black';
            gerenciamento.txt_pesquisa.style.borderRight = 'none';
            gerenciamento.txt_pesquisa.style.borderBottomRightRadius = '0px';
            gerenciamento.txt_pesquisa.style.borderTopRightRadius = '0px';
            
            gerenciamento.txt_pesquisa.style.width = '100%';
            gerenciamento.txt_pesquisa.focus();
        },

        esconderInput: ()=>{
            gerenciamento.txt_pesquisa.style.width = '0%';

            gerenciamento.btnPesquisar.style.borderBottomLeftRadius = '10px';
            gerenciamento.btnPesquisar.style.borderTopLeftRadius = '10px';
            gerenciamento.btnPesquisar.style.borderLeft = '1px solid black';
        },

        pesquisaOn: ()=>{
            gerenciamento.mostrarInput();
            gerenciamento.btnPesquisar.removeEventListener('click', gerenciamento.pesquisaOn);
            gerenciamento.btnPesquisar.addEventListener('click', gerenciamento.pesquisar);

        },

        pesquisaOff: ()=>{
            gerenciamento.esconderInput();
            gerenciamento.btnPesquisar.removeEventListener('click',gerenciamento.pesquisar);
            gerenciamento.btnPesquisar.addEventListener('click', gerenciamento.pesquisaOn);
            gerenciamento.txt_pesquisa.value = "";
            gerenciamento.txt_pesquisa.style.border = 'none';
        },

        pesquisar: ()=>{
            gerenciamento.concatenarPrefixo("TESTE");
            if(gerenciamento.txt_pesquisa.value != ''){
                console.log(`Pesquisando por ${gerenciamento.txt_pesquisa.value}`);
                const produtoPesquisado = gerenciamento.txt_pesquisa.value;
                const produtosEncontrados = gerenciamento.produtos.filter(produto => produto.children[1].children[0].value == produtoPesquisado);
                console.log(produtosEncontrados);

                gerenciamento.mostrarApenasPesquisado(produtosEncontrados);
                console.log(gerenciamento.btnLimparPesquisa);
                gerenciamento.btnLimparPesquisa.style.display = 'block';

                gerenciamento.pesquisaOff();
            }
            else{
                gerenciamento.txt_pesquisa.style.border = '1px solid red';
                gerenciamento.txt_pesquisa.style.borderRight = 'none';
                gerenciamento.txt_pesquisa.style.borderBottomRightRadius = '0px';
                gerenciamento.txt_pesquisa.style.borderTopRightRadius = '0px';
            }
            
        },

        /**
         * 
         * @param {Array} produtosEncontrados Lista de produtos encontrados
         */
        mostrarApenasPesquisado: (produtosEncontrados)=>{
            if(produtosEncontrados.length>0){
                console.log("Entrou")
                gerenciamento.produtos.forEach((produto)=>{
                    var naoEncontrado = true;
                    for(const produtoSelecionado of produtosEncontrados){
                        if(produto.id == produtoSelecionado.id){
                            naoEncontrado = false;
                        }
                    }

                    if(naoEncontrado){
                        produto.style.display = 'none';
                    }
                })
            }
        },

        mostrarTudo: ()=>{
            gerenciamento.produtos.forEach(produto => produto.style.display = 'table');
            gerenciamento.btnLimparPesquisa.style.display = 'none';
        },

        concatenarPrefixo: (prefixo = "NOME:")=>{
            
        }
    }

    // Adiciona um novo produto
    gerenciamento.btnNovoProduto.addEventListener('click', gerenciamento.novoProduto);
    
    // Mostrar Alerta
    gerenciamento.btnRemoverProduto.addEventListener('click',()=>{
        if(gerenciamento.produtoSelecionado != null){
            gerenciamento.alerta(gerenciamento.elementoSelecionado);
        }
    });

    // Mostra o input de pesquisa
    gerenciamento.btnPesquisar.addEventListener('click',gerenciamento.pesquisaOn);

    // Remove produto
    gerenciamento.elementoAlerta.botoes.remover.addEventListener('click',()=>{
        console.log("REMOVENDO: " + gerenciamento.produtoSelecionado);

        gerenciamento.removerProduto(gerenciamento.produtoSelecionado);
        gerenciamento.fecharAlerta();
        gerenciamento.produtoSelecionado = null;
    });

    // Cancela a opção de remover
    gerenciamento.elementoAlerta.botoes.cancelar.addEventListener('click', gerenciamento.fecharAlerta);

    // Ouvindo qualquer evento de click
    document.addEventListener('click',(event)=>{
        if(event.target.id != 'pesquisar' && event.target.id!='txt_pesquisa'){
            gerenciamento.pesquisaOff();

            gerenciamento.btnPesquisar.addEventListener('click',gerenciamento.pesquisaOn);
        }
    });

    gerenciamento.btnLimparPesquisa.addEventListener('click', gerenciamento.mostrarTudo);

    return gerenciamento;
}