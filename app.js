// app.js
let transacoes = []; // Armazenará as transações do usuário

// Função para adicionar uma transação
document.getElementById('formControle').addEventListener('submit', function(e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    // Adiciona a transação no array
    transacoes.push({ tipo, descricao, valor, data });
    
    // Atualiza os totais
    atualizarTotais();
    alert('Transação adicionada com sucesso!');
});

// Função para atualizar o resumo financeiro
function atualizarTotais() {
    let lucroTotal = 0;
    let prejuizoTotal = 0;

    transacoes.forEach(t => {
        if (t.tipo === 'entrada') {
            lucroTotal += t.valor;
        } else {
            prejuizoTotal += t.valor;
        }
    });

    document.getElementById('lucroTotal').textContent = lucroTotal.toFixed(2);
    document.getElementById('prejuizoTotal').textContent = prejuizoTotal.toFixed(2);
}

// Função para gerar o relatório em PDF
document.getElementById('gerarRelatorio').addEventListener('click', function() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    // Filtro de transações pelo período
    const transacoesFiltradas = transacoes.filter(t => {
        const dataTransacao = new Date(t.data);
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        return dataTransacao >= inicio && dataTransacao <= fim;
    });

    // Exibe o botão para download do relatório PDF
    if (transacoesFiltradas.length > 0) {
        document.getElementById('downloadPdf').style.display = 'block';
    }
});

// Função para download do relatório PDF (em backend você usaria uma biblioteca como FPDF no PHP)
document.getElementById('downloadPdf').addEventListener('click', function() {
    alert('Função para gerar PDF não implementada (necessita backend)');
});
