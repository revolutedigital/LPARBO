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
        source: 'Landing Page - Modal Premium'
    };

    console.log('🎯💰🔥 LEAD QUENTE CAPTURADO (Modal Premium):', data);

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

// EXEMPLO DE COMO FICARÁ A ESTRUTURA DOS DADOS:
/*
{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(19) 99999-9999",
    "source": "Landing Page - Modal Premium"
}
*/
