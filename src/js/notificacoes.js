function initNotificacoes(){
    const notificacoes = {
        ultimoId: 1,
        container: document.querySelector('.container-notificacoes'),
        avisos: [],

        adicionarNotificacao: (notificacao)=>{
            const novaNotificacao = {
                texto: document.createElement('span'),
                button: document.createElement('button')
            }

            const item = document.createElement('div');
            item.setAttribute('class','item');
            item.id = notificacao.id;

            novaNotificacao.texto.setAttribute('class','descricao');
            novaNotificacao.texto.innerText = notificacao.texto;

            novaNotificacao.button.setAttribute('class','marcarLido');
            novaNotificacao.button.innerText = 'Marcar como Lido';

            novaNotificacao.button.addEventListener('click',()=>{
                notificacoes.removerNotificacao(item.id);
            })

            item.appendChild(novaNotificacao.texto);
            item.appendChild(novaNotificacao.button);

            notificacoes.container.appendChild(item);
        
            notificacoes.avisos.push(item);
        },

        novaNotificacao: (informacao)=>{
            const notificacao = {
                id: notificacoes.ultimoId++,
                texto: informacao,
            }

            notificacoes.adicionarNotificacao(notificacao);
        },

        removerNotificacao: (id)=>{
            notificacoes.avisos.forEach((item, index)=>{
               if(item.id == id){
                    for(let i=index; i<notificacoes.avisos.length; i++){
                        notificacoes.avisos[i] = notificacoes.avisos[i+1];
                    }

                    notificacoes.container.removeChild(item);
                    notificacoes.avisos.pop();

                    return
               }
            });
        },

        limparNotificacoes: ()=>{
            notificacoes.avisos.forEach((item)=>{
                notificacoes.container.removeChild(item);
            });

            while(notificacoes.avisos.length>0){
                notificacoes.avisos.pop();
            }
        }
    }

    const btnLimparNotificacoes = document.querySelector('#limparNotificacoes');
    btnLimparNotificacoes.addEventListener('click', notificacoes.limparNotificacoes);

    const max=30;
    for(let i=0; i<max; i++){
        notificacoes.novaNotificacao('Produto em baixo estoque! '+(i+1));
    }

    console.log(notificacoes.avisos);
}

initNotificacoes();