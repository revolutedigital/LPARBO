// CÓDIGO PARA GOOGLE APPS SCRIPT
// Cole este código em: Extensões > Apps Script

function doPost(e) {
  try {
    // Abre a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);

    // Adiciona nova linha com os dados nos campos corretos:
    // A: NOME | B: TELEFONE | C: EMAIL | D: ANUNCIO
    sheet.appendRow([
      data.name,              // A: NOME
      data.phone,             // B: TELEFONE
      data.email,             // C: EMAIL
      data.source || 'LP'     // D: ANUNCIO
    ]);

    // Log para debug
    Logger.log('Lead salvo: ' + data.name + ' - ' + data.email);

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Lead salvo com sucesso!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Log de erro
    Logger.log('Erro: ' + error.toString());

    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (execute para testar se está funcionando)
function testScript() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    'Teste Nome',           // A: NOME
    '(19) 99999-9999',     // B: TELEFONE
    'teste@email.com',     // C: EMAIL
    'LP - Teste'           // D: ANUNCIO
  ]);

  Logger.log('✅ Teste executado com sucesso!');
}

// OPCIONAL: Enviar notificação por email quando entrar lead
function enviarNotificacao(nome, email, phone) {
  var destinatario = "seu-email@gmail.com"; // MUDE AQUI PARA SEU EMAIL
  var assunto = "🔥 Novo Lead - Residencial Arboretum";
  var corpo = "Novo lead capturado na landing page!\n\n" +
              "Nome: " + nome + "\n" +
              "Email: " + email + "\n" +
              "Telefone: " + phone + "\n\n" +
              "Acesse a planilha: https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit";

  MailApp.sendEmail(destinatario, assunto, corpo);
}

// Para ativar notificações, adicione esta linha na função doPost após sheet.appendRow:
// enviarNotificacao(data.name, data.email, data.phone);
