# 📊 Integração Google Sheets - Residencial Arboretum

## 🎯 Objetivo
Enviar automaticamente todos os leads capturados no formulário para a planilha do Google Sheets.

**Planilha:** https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit?gid=0#gid=0

---

## 📋 PASSO A PASSO

### **1. Abrir a Planilha do Google Sheets**

1. Acesse: https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit?gid=0#gid=0
2. Certifique-se que está logado na conta correta

---

### **2. Preparar a Planilha**

Na primeira linha (cabeçalho), adicione as seguintes colunas:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Data/Hora | Nome | Email | WhatsApp | Origem | Status |

**Importante:**
- A linha 1 deve ter esses cabeçalhos
- Os leads serão adicionados a partir da linha 2

---

### **3. Criar o Google Apps Script**

1. Na planilha aberta, vá em: **Extensões > Apps Script**
2. Apague todo o código padrão que aparecer
3. Cole o código abaixo:

```javascript
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

    // Adiciona nova linha com os dados
    sheet.appendRow([
      dateTime,           // Data/Hora
      data.name,          // Nome
      data.email,         // Email
      data.phone,         // WhatsApp
      data.source || 'Landing Page',  // Origem
      'Novo'              // Status
    ]);

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Lead salvo com sucesso!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional)
function testScript() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var now = new Date();
  var timeZone = "America/Sao_Paulo";
  var dateTime = Utilities.formatDate(now, timeZone, "dd/MM/yyyy HH:mm:ss");

  sheet.appendRow([
    dateTime,
    'Teste Nome',
    'teste@email.com',
    '(19) 99999-9999',
    'Teste',
    'Teste'
  ]);

  Logger.log('Teste executado com sucesso!');
}
```

4. Clique em **Salvar** (ícone de disquete) ou `Cmd+S`
5. Dê um nome ao projeto: **"Leads Arboretum"**

---

### **4. Implantar como Web App**

1. No Apps Script, clique em **Implantar > Nova implantação**
2. Clique em **Selecionar tipo > Aplicativo da Web**
3. Preencha:
   - **Descrição:** Receber leads do site
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em **Implantar**
5. **IMPORTANTE:** Autorize o acesso quando solicitado:
   - Clique em **Autorizar acesso**
   - Escolha sua conta
   - Clique em **Avançado**
   - Clique em **Acessar Leads Arboretum (não seguro)**
   - Clique em **Permitir**
6. **COPIE A URL DO WEB APP** que aparece (algo como):
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

⚠️ **GUARDE ESSA URL!** Você vai precisar dela no próximo passo.

---

### **5. Testar o Script (Opcional mas Recomendado)**

Antes de conectar ao site, teste se está funcionando:

1. No Apps Script, clique em **Executar > testScript**
2. Autorize se solicitado
3. Volte para a planilha
4. Deve aparecer uma nova linha de teste
5. Se apareceu, está funcionando! ✅

---

### **6. Configurar o Site**

Agora vou modificar o código do site para enviar os leads para sua planilha.

**Me passe a URL do Web App que você copiou no passo 4.**

Ela deve ser algo como:
```
https://script.google.com/macros/s/AKfycby.../exec
```

---

## 🔧 Após Configurar

### **Como vai funcionar:**

1. Usuário preenche formulário no site
2. JavaScript envia dados para Google Sheets via Apps Script
3. Lead é salvo na planilha automaticamente
4. Usuário é redirecionado para página de obrigado
5. Meta Pixel dispara evento Lead

### **Campos salvos:**

- **Data/Hora:** Automático (hora de Brasília)
- **Nome:** Do formulário
- **Email:** Do formulário
- **WhatsApp:** Do formulário
- **Origem:** Landing Page
- **Status:** Novo

---

## 📱 Notificações por Email (Opcional)

Quer receber email toda vez que entrar um lead?

Adicione essa função no Apps Script:

```javascript
function enviarNotificacao(nome, email, phone) {
  var destinatario = "seu-email@gmail.com"; // MUDE AQUI
  var assunto = "🔥 Novo Lead - Residencial Arboretum";
  var corpo = "Novo lead capturado!\n\n" +
              "Nome: " + nome + "\n" +
              "Email: " + email + "\n" +
              "WhatsApp: " + phone + "\n\n" +
              "Acesse a planilha: https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit";

  MailApp.sendEmail(destinatario, assunto, corpo);
}
```

E adicione essa linha na função `doPost`, logo após `sheet.appendRow`:

```javascript
// Envia notificação por email
enviarNotificacao(data.name, data.email, data.phone);
```

---

## ⚠️ Troubleshooting

### Erro: "Script não autorizado"
**Solução:** Volte no passo 4 e autorize corretamente

### Leads não aparecem na planilha
**Solução:**
1. Verifique se a URL do Web App está correta no código do site
2. Abra o console do navegador (F12) e veja se há erros
3. Verifique se os cabeçalhos da planilha estão na linha 1

### Erro 403 ou 405
**Solução:**
1. Reimplante o Web App
2. Certifique-se que "Quem tem acesso" está como "Qualquer pessoa"

### Data/hora errada
**Solução:** Verifique o timezone no código: `America/Sao_Paulo`

---

## 🎯 Próximo Passo

**Me envie a URL do Web App** que você copiou no passo 4, e eu atualizo o código do site para integrar com a planilha!

---

**Última atualização:** 11/12/2024
