# ⚡ SETUP RÁPIDO - Google Sheets Integration

## 📋 Sua Planilha
**URL:** https://docs.google.com/spreadsheets/d/1beiJ1wn-1xCB8lHX5lvVudd_jgzBtFoSJ11i76tQyCA/edit

**Campos (já configurados):**
- A: NOME
- B: TELEFONE
- C: EMAIL
- D: ANUNCIO

---

## 🚀 PASSO A PASSO (5 MINUTOS)

### 1️⃣ Abrir Apps Script
1. Abra a planilha
2. Vá em: **Extensões > Apps Script**
3. Apague qualquer código que aparecer

### 2️⃣ Colar o Código
1. Abra o arquivo: `GOOGLE-APPS-SCRIPT.js`
2. Copie TODO o código
3. Cole no Apps Script
4. Clique em **Salvar** (💾)
5. Nomeie: "Leads Arboretum"

### 3️⃣ Testar (Recomendado)
1. No Apps Script, selecione a função: `testScript`
2. Clique em **Executar** (▶️)
3. Autorize quando pedir
4. Volte na planilha
5. Deve ter uma linha de teste ✅

### 4️⃣ Implantar como Web App
1. Clique em **Implantar > Nova implantação**
2. Clique em **Selecionar tipo > Aplicativo da Web**
3. Configure:
   - **Descrição:** Receber leads LP
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** ⚠️ **Qualquer pessoa**
4. Clique em **Implantar**
5. **Autorize** quando pedir:
   - Clique em "Autorizar acesso"
   - Escolha sua conta
   - Clique em "Avançado"
   - Clique em "Acessar Leads Arboretum (não seguro)"
   - Clique em "Permitir"

### 5️⃣ COPIAR A URL
Você receberá uma URL parecida com:
```
https://script.google.com/macros/s/AKfycby_XXXXXXXXXXXXXXXXX/exec
```

**⚠️ COPIE ESSA URL COMPLETA!**

---

## 📤 ME ENVIE A URL

Cole aqui a URL que você copiou no passo 5.

Eu vou:
1. ✅ Atualizar o código do formulário
2. ✅ Configurar envio automático
3. ✅ Testar
4. ✅ Fazer deploy

---

## 🎯 Como vai funcionar

```
Usuário preenche form
    ↓
Dados enviados para Google Sheets
    ↓
Lead salvo na planilha:
- A: NOME (João Silva)
- B: TELEFONE ((19) 99999-9999)
- C: EMAIL (joao@email.com)
- D: ANUNCIO (LP)
    ↓
Redirect para Thank You Page
    ↓
Meta Pixel dispara evento Lead
```

---

## 📧 Notificações por Email (Opcional)

Se quiser receber email a cada lead:

1. No código do Apps Script, procure:
   ```javascript
   var destinatario = "seu-email@gmail.com"; // MUDE AQUI
   ```
2. Mude para seu email
3. Na função `doPost`, após a linha `sheet.appendRow([...]);`, adicione:
   ```javascript
   enviarNotificacao(data.name, data.email, data.phone);
   ```
4. Salve e reimplante

---

## ⚠️ Troubleshooting

**Erro ao executar testScript:**
- Clique em "Revisar permissões"
- Siga o fluxo de autorização

**URL não funciona:**
- Certifique-se que "Quem tem acesso" = "Qualquer pessoa"
- Reimplante o Web App

**Leads não aparecem:**
- Verifique se a URL está correta
- Abra console do navegador (F12) e veja erros
- Execute testScript de novo

---

**Pronto? Me manda a URL que finalizo em 2 minutos! 🚀**
