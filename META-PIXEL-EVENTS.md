# Meta Pixel Events - Residencial Arboretum
**Pixel ID:** 1581524869002146

## 📊 Eventos Configurados

### 1. PageView (Automático)
**Onde dispara:** Todas as páginas (index.html e thank-you.html)
**Quando:** Carregamento da página
**Parâmetros:** Nenhum (padrão Meta)

---

### 2. ViewContent
**Onde dispara:** index.html
**Quando:** Logo após o carregamento completo da página (window.load)
**Arquivo:** index.html linha ~3140

```javascript
fbq('track', 'ViewContent', {
    content_name: 'Residencial Arboretum - Landing Page',
    content_category: 'Real Estate',
    content_type: 'product',
    value: 690000,
    currency: 'BRL'
});
```

**O que rastreia:** Visualização da landing page completa
**Console log:** ✅ META PIXEL: ViewContent Event Disparado

---

### 3. InitiateCheckout
**Onde dispara:** index.html
**Quando:** Usuário clica em qualquer botão que abre o modal de lead (tabela de preços)
**Arquivo:** index.html linha ~3345 (função openModal)

```javascript
fbq('track', 'InitiateCheckout', {
    content_name: 'Modal Lead - Tabela de Preços',
    content_category: 'Real Estate Lead',
    currency: 'BRL',
    value: 690000
});
```

**O que rastreia:** Intenção de conversão (abriu modal de lead)
**Console log:** ✅ META PIXEL: InitiateCheckout Event Disparado

---

### 4. Lead ⭐ (EVENTO PRINCIPAL)
**Onde dispara:** thank-you.html
**Quando:** Página de obrigado é carregada (após submit do formulário)
**Arquivo:** thank-you.html linha ~22

```javascript
fbq('track', 'Lead', {
    content_name: 'Lead Convertido - Thank You Page',
    content_category: 'Real Estate Lead',
    currency: 'BRL',
    value: 690000,
    status: 'completed'
});
```

**O que rastreia:** Conversão confirmada de lead
**Console log:** ✅ META PIXEL: Lead Event Disparado na Thank You Page

**IMPORTANTE:** Este evento dispara na thank-you page, NÃO no submit do form.
Isso garante que só seja contabilizado quando a conversão realmente acontece.

---

### 5. CompleteRegistration
**Onde dispara:** thank-you.html
**Quando:** Página de obrigado é carregada (junto com Lead)
**Arquivo:** thank-you.html linha ~28

```javascript
fbq('track', 'CompleteRegistration', {
    content_name: 'Lead Registration Complete',
    status: 'completed'
});
```

**O que rastreia:** Registro completo do usuário
**Console log:** ✅ META PIXEL: CompleteRegistration Event Disparado

---

### 6. Contact
**Onde dispara:** index.html e thank-you.html
**Quando:** Clique em botões de WhatsApp
**Arquivo:** index.html linha ~3482

```javascript
fbq('track', 'Contact', {
    content_name: 'WhatsApp Contact',
    content_category: 'Contact Button',
    method: 'WhatsApp'
});
```

**O que rastreia:** Tentativa de contato via WhatsApp
**Console log:** 📊 META PIXEL: Contact Event (WhatsApp)

---

## 🎯 Eventos Customizados

### WhatsAppClick
**Tipo:** Custom Event
**Quando:** Clique em botões WhatsApp

```javascript
fbq('trackCustom', 'WhatsAppClick', {
    button_location: 'Float Button' | 'Sticky CTA Mobile' | 'Thank You Page'
});
```

---

### CTAClick
**Tipo:** Custom Event
**Quando:** Clique em CTAs principais

```javascript
fbq('trackCustom', 'CTAClick', {
    cta_text: 'Texto do botão',
    cta_location: 'Hero Section' | 'Premium CTA' | 'CTA Button'
});
```

---

### ScrollDepth
**Tipo:** Custom Event
**Quando:** Usuário rola a página

```javascript
fbq('trackCustom', 'ScrollDepth', {
    depth: '25%' | '50%' | '75%' | '100%'
});
```

---

## 🔍 Fluxo de Conversão

```
1. Usuário carrega página
   └─> PageView (auto)
   └─> ViewContent (value: 690000)

2. Usuário clica em CTA
   └─> CTAClick (custom)
   └─> Modal abre
       └─> InitiateCheckout (value: 690000)

3. Usuário preenche formulário e submete
   └─> Dados salvos no localStorage
   └─> Redirect para /thank-you.html

4. Thank You Page carrega
   └─> PageView (auto)
   └─> Lead (value: 690000) ⭐
   └─> CompleteRegistration

5. Usuário clica em WhatsApp
   └─> Contact
   └─> WhatsAppClick (custom)
```

---

## 🧪 Como Testar

### No Browser (Console):
```javascript
// Verificar se pixel está carregado
typeof fbq !== 'undefined'

// Ver histórico de eventos
fbq('track', 'trackCustom', ...)
```

### Ferramentas:
1. **Meta Pixel Helper** (Chrome Extension)
   - Instale e abra DevTools
   - Navegue pelo site
   - Veja eventos disparando em tempo real

2. **Meta Events Manager**
   - https://business.facebook.com/events_manager2
   - Aba "Test Events"
   - Veja eventos ao vivo

3. **Console Logs**
   - Todos eventos importantes têm console.log
   - Abra DevTools > Console
   - Navegue e veja logs com ✅

---

## 💡 Otimização de Campanhas

### Eventos para usar como Conversão:
- **Lead** (principal) - Use para otimizar para captura de leads
- **InitiateCheckout** - Use para otimizar para intenção
- **Contact** - Use para otimizar para contato direto

### Eventos para usar como Otimização:
- **ViewContent** - Awareness
- **InitiateCheckout** - Consideration
- **Lead** - Conversion

### Custom Audiences:
- Visitantes que dispararam ViewContent
- Visitantes que abriram modal (InitiateCheckout)
- Visitantes que converteram (Lead)
- Visitantes que clicaram em WhatsApp (Contact)

### Lookalike Audiences:
- Baseado em quem converteu (Lead)
- Baseado em quem iniciou checkout (InitiateCheckout)

---

## ⚠️ Troubleshooting

### Eventos não aparecem no Events Manager:
1. Verificar Pixel Helper no navegador
2. Verificar console logs
3. Verificar se não há adblockers ativos
4. Aguardar 5-10 minutos (delay normal do Meta)

### Lead não dispara:
1. Verificar se thank-you.html carrega corretamente
2. Verificar console: "✅ META PIXEL: Lead Event Disparado"
3. Verificar aba Network no DevTools para request do pixel

### Eventos duplicados:
1. Verificar se não há múltiplos pixels na página
2. Verificar se eventos não estão sendo chamados duas vezes

---

**Última atualização:** 11/12/2024
**Desenvolvido por:** Claude Code
