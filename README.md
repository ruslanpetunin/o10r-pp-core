# o10r-pp-core

`o10r-pp-core` is a TypeScript utility library that provides essential foundational tools for building a modern payment page.

It offers ready-to-use, composable utilities for interacting with the payment API, managing events, handling HTTP requests, decoding JWT tokens, and processing project settings.

---

## 📦 Installation

```bash
npm install o10r-pp-core
```

> Requires **Node.js v24+**

---

## 🧰 Features

### 1. `useApi`

Provides an API client object with all available payment page methods, fully typed.

#### Example:

```ts
import { useApi } from 'o10r-pp-core';

const apiHost = 'https://example.com';
const api = useApi(apiHost);

api.getProjectSettings()
   .then((settings) => {
     // handle settings
   })
   .catch((error) => {
     // handle error
   });
```

---

### 2. `useEventManager`

Provides an object for subscribing to, emitting, and unsubscribing from events.

#### Example:

```ts
import { useEventManager } from 'o10r-pp-core';

type EventNameHandler = (param1: string, param2: number) => void;

type EventMap = {
  eventName: EventNameHandler;
};

const handle: EventNameHandler = (param1, param2) => {
  console.log(param1, param2);
};

const eventManager = useEventManager<EventMap>();

eventManager.on('eventName', handle);
eventManager.emit('eventName', 'test', 4324);
eventManager.off('eventName', handle);
```

---

### 3. `useHttp`

A simple HTTP utility that allows making typed requests and handling errors gracefully.

#### Example:

```ts
import { useHttp } from 'o10r-pp-core';

type ResponseExample = {
  id: number;
};

const url = 'https://example.com/test';
const { request } = useHttp();

request<ResponseExample>(url)
   .then((response) => {
     // use response
   })
   .catch((error) => {
     // handle error
   });
```

---

### 4. `useJwtToken`

Extracts initialization data for the payment page from a Base64-encoded JWT token payload.

#### Example:

```ts
import { useJwtToken } from 'o10r-pp-core';

const token = '...';
const initData = useJwtToken(token);
```

---

### 5. `useProjectSettings`

Processes raw API project settings and transforms them into a ready-to-use configuration for the payment page.

#### Example:

```ts
import { useProjectSettings } from 'o10r-pp-core';

...

const projectSettings = await useProjectSettings(api, initData, paymentMethodFactory);
```

---

### 6. `useTranslations`

Loads translation dictionaries from an API endpoint and provides a `translate` function for substituting template variables.
It also exposes helpers for switching the current language and listening for language changes.

#### Example:

```ts
import { useApi, useTranslations, Language } from 'o10r-pp-core';

const api = useApi('https://example.com');
const { translate, setLanguage, onLanguageChange } = useTranslations(api, Language.EN);

onLanguageChange((lang) => {
  console.log('Language switched to', lang);
});

await setLanguage(Language.RU);
const hello = translate('hello', { user: { email: 'test@example.com' } });
```

---
