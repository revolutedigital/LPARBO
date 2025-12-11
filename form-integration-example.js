// EXEMPLO DE CÓDIGO QUE SERÁ ADICIONADO AO index.html
// Substitua YOUR_WEB_APP_URL pela URL que você recebeu do Google Apps Script

// Submit do formulário do modal
leadModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        source: 'LP' // Campo ANUNCIO
    };

    console.log('🎯💰🔥 LEAD QUENTE CAPTURADO:', data);

    // Salva no localStorage
    localStorage.setItem('leadData', JSON.stringify(data));

    try {
        // Envia para Google Sheets
        const response = await fetch('YOUR_WEB_APP_URL', {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        console.log('✅ Lead enviado para Google Sheets!');

    } catch (error) {
        console.error('❌ Erro ao enviar lead:', error);
        // Mesmo com erro, continua o fluxo
    }

    // Redireciona para Thank You Page (onde o evento Lead do Meta Pixel será disparado)
    window.location.href = '/thank-you.html';
});

// ESTRUTURA DOS DADOS QUE VAI PARA A PLANILHA:
/*
Planilha: https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit

Campos:
A: NOME       → "João Silva"
B: TELEFONE   → "(19) 99999-9999"
C: EMAIL      → "joao@email.com"
D: ANUNCIO    → "LP"
*/
