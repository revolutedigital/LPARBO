// CÓDIGO PARA GOOGLE APPS SCRIPT
// Cole este código em: Extensões > Apps Script

function doPost(e) {
  try {
    // Abre a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);

    // Pega data/hora atual no fuso horário de São Paulo
    var now = new Date();
    var timeZone = "America/Sao_Paulo";
    var dateTime = Utilities.formatDate(now, timeZone, "dd/MM/yyyy HH:mm:ss");

    // DEDUPLICAÇÃO: Verifica se email já existe nos últimos 5 minutos
    var isDuplicate = checkDuplicate(sheet, data.email, now);
    if (isDuplicate) {
      Logger.log('Lead duplicado ignorado: ' + data.email);
      return ContentService
        .createTextOutput(JSON.stringify({
          'status': 'duplicate',
          'message': 'Lead já cadastrado recentemente'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Adiciona nova linha com os dados nos campos corretos:
    // A: NOME | B: TELEFONE | C: EMAIL | D: ANUNCIO | E: DATA/HORA
    sheet.appendRow([
      data.name,              // A: NOME
      data.phone,             // B: TELEFONE
      data.email,             // C: EMAIL
      data.source || 'LP',    // D: ANUNCIO
      dateTime                // E: DATA/HORA
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

// Função para verificar duplicados nos últimos 5 minutos
function checkDuplicate(sheet, email, now) {
  var data = sheet.getDataRange().getValues();
  var fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  // Percorre as linhas de baixo para cima (mais recentes primeiro)
  for (var i = data.length - 1; i >= 1; i--) {
    var rowEmail = data[i][2]; // Coluna C = Email
    var rowDateTime = data[i][4]; // Coluna E = Data/Hora

    // Converte string de data para Date object
    if (rowDateTime) {
      var parts = rowDateTime.toString().split(' ');
      if (parts.length === 2) {
        var dateParts = parts[0].split('/');
        var timeParts = parts[1].split(':');
        var rowDate = new Date(
          parseInt(dateParts[2]), // ano
          parseInt(dateParts[1]) - 1, // mês (0-indexed)
          parseInt(dateParts[0]), // dia
          parseInt(timeParts[0]), // hora
          parseInt(timeParts[1]), // minuto
          parseInt(timeParts[2])  // segundo
        );

        // Se a linha é mais antiga que 5 minutos, para a busca
        if (rowDate < fiveMinutesAgo) {
          break;
        }

        // Verifica se o email é igual (case insensitive)
        if (rowEmail && rowEmail.toString().toLowerCase() === email.toLowerCase()) {
          return true; // É duplicado
        }
      }
    }
  }

  return false; // Não é duplicado
}

// Função de teste (execute para testar se está funcionando)
function testScript() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var now = new Date();
  var timeZone = "America/Sao_Paulo";
  var dateTime = Utilities.formatDate(now, timeZone, "dd/MM/yyyy HH:mm:ss");

  sheet.appendRow([
    'Teste Nome',           // A: NOME
    '(19) 99999-9999',     // B: TELEFONE
    'teste@email.com',     // C: EMAIL
    'LP - Teste',          // D: ANUNCIO
    dateTime               // E: DATA/HORA
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
