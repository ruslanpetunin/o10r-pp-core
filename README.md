# o10r-pp-core

`o10r-pp-core` is the lowest level helper library for building a modern Payment Page. It offers small, composable utilities for working with APIs, events, HTTP requests, JWT tokens, translations, cookies and card detection.

---

## 📦 Installation

```bash
npm install o10r-pp-core
```

> Requires **Node.js v24+**

---

## 🧰 Features

### 1. `useApi`

Creates an API client object with all available payment page methods, fully typed.

```ts
import { useApi } from 'o10r-pp-core';

const api = useApi('https://example.com');
const settings = await api.getProjectSettings();
```

---

### 2. `useEventManager`

Provides an object for subscribing to, emitting and unsubscribing from events.

```ts
import { useEventManager } from 'o10r-pp-core';

type EventMap = { eventName: (p1: string, p2: number) => void };

const events = useEventManager<EventMap>();
const handler = (p1: string, p2: number) => console.log(p1, p2);

events.on('eventName', handler);
events.emit('eventName', 'test', 4324);
events.off('eventName', handler);
```

---

### 3. `useHttp`

A simple HTTP utility that allows making typed requests and handling errors gracefully.

```ts
import { useHttp } from 'o10r-pp-core';

type ResponseExample = { id: number };

const { request } = useHttp();
const data = await request<ResponseExample>('https://example.com/test');
```

---

### 4. `useJwtToken`

Extracts initialization data for the payment page from a Base64‑encoded JWT token payload.

```ts
import { useJwtToken } from 'o10r-pp-core';

const token = '...';
const initData = useJwtToken(token);
```

---

### 5. `useTranslator`

Loads translation dictionaries from an API endpoint and provides a `translate` function for substituting template variables. It also exposes helpers for switching the current language and listening for language changes.

```ts
import { useApi, useTranslator, Language } from 'o10r-pp-core';

const api = useApi('https://example.com');
const { translate, setLanguage, on } = useTranslator(api);

on('languageChanged', lang => console.log('Language switched to', lang));
await setLanguage(Language.RU);
const hello = translate('hello', { user: { email: 'test@example.com' } });
```

---

### 6. `useCookies`

Utility for getting, setting and removing cookies in the browser.

```ts
import { useCookies } from 'o10r-pp-core';

const cookies = useCookies();

cookies.set('session', '123', { path: '/', secure: true });
const session = cookies.get('session');
cookies.remove('session');
```

---

### 7. `useCardTypeDetector`

Detects the card type based on the card number using built‑in patterns.

```ts
import { useCardTypeDetector } from 'o10r-pp-core';

const { detect } = useCardTypeDetector();
const card = detect('4111111111111111');
console.log(card?.code); // "VISA"
```

---
