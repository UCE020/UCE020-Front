# Assinae Front

Frontend organizado com Next.js, Tailwind CSS e Material UI.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Material UI v9** - React component library
- **Geist Fonts** - Optimized fonts from Vercel

---

# Project Structure

```txt
src/
├── app/                  # Rotas e páginas da aplicação (App Router)
│
├── components/           # Componentes reutilizáveis globais
│   ├── ui/               # Componentes genéricos reutilizáveis
│   ├── modals/           # Modais compartilhados
│   ├── event/            # Componentes relacionados a eventos
│   └── certificate/      # Componentes relacionados a certificados
│
├── features/             # Organização por domínio/feature
│   ├── auth/
│   ├── event/
│   ├── home/
│   ├── landing-page/
│   └── user-profile/
│
├── hooks/                # Custom React hooks
├── lib/                  # Configurações globais (theme, libs, etc)
├── providers/            # Context providers
├── services/             # Camada de comunicação com API
├── types/                # Tipagens TypeScript
├── utils/                # Funções utilitárias
└── constants/            # Constantes globais
```

---

# Arquitetura do Projeto

O projeto segue uma arquitetura baseada em:

- **Next.js App Router**
- **Feature-based architecture**
- **Componentização modular**
- **Separação clara de responsabilidades**

---

# Estrutura do `app/`

A pasta `app/` representa as rotas da aplicação utilizando o App Router do Next.js.

## Route Groups

O projeto utiliza **Route Groups**:

```txt
(private)
(public)
(auth)
```

Pastas entre parênteses:

- servem apenas para organização
- NÃO aparecem na URL final

Exemplo:

```txt
app/(private)/home/page.tsx
```

gera a rota:

```txt
/home
```

---

## Rotas privadas

```txt
app/(private)/
├── certificate/
├── event/
├── home/
└── user-profile/
```

Essas rotas compartilham:

```txt
app/(private)/layout.tsx
```

Usado para conter as rotas de visualização interna do sistema;

---

## Rotas públicas

```txt
app/(public)/
├── (auth)/
└── landing-page/
```

Usado para conter as de visualização externa do sistema;

### `(auth)`

Agrupa páginas relacionadas à autenticação:

Exemplos:

```txt
login/
register/
forgot-password/
```

---

# Padronização de Nomes

O projeto segue uma convenção de nomenclatura consistente.

## Pastas → `kebab-case`

```txt
cetificate
landing-page
forgot-password
```

## Arquivos → `PascalCase`

```txt
ScheduleCard.tsx
TextInput.tsx
CertificateForm.tsx
```

---


# Separação de Responsabilidades

## `app/`

Responsável por:

- rotas
- layouts
- páginas
- navegação

---

## `components/`

Responsável por:

- componentes reutilizáveis
- UI compartilhada
- elementos visuais globais

---

## `features/`

Responsável por:

- regras de negócio
- organização por domínio
- lógica específica da aplicação

Cada feature pode conter:

```txt
components/
hooks/
services/
types/
schemas/
utils/
```

---

# Padrões Arquiteturais Utilizados

## Feature-Based Architecture

Organização baseada em domínio:

```txt
features/event
features/auth
features/user-profile
```

Isso facilita:

- escalabilidade
- desacoplamento
- manutenção
- modularização

---

## Componentização

Separação entre:

| Tipo | Local |
|---|---|
| UI genérica | `components/ui` |
| Componentes de domínio | `components/event` |
| Regras de negócio | `features/*` |

---

## Layouts Compartilhados

Uso de:

```txt
layout.tsx
```

para compartilhamento de:

- headers
- sidebars
- providers
- estilos globais

---

# Getting Started

## Node version

This project is pinned to Node.js `26.0.0` via `.nvmrc`.

If you use `nvm`, run:

```bash
nvm use
```

If you do not use a version manager, install Node.js `26.0.0` before running the app.

---

## Install dependencies

```bash
npm install
```

---

## Copy environment variables

```bash
cp .env.example .env.local
```

---

## Run development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Environment Variables

See `.env.example` for available environment variables:

- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXTAUTH_SECRET` - NextAuth secret key

---

# Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

# Learn More

- Next.js Documentation
- Tailwind CSS Documentation
- Material UI Documentation
- TypeScript Documentation

---

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform.