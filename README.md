# Paymount Live

Přehled transakcí nad multiměnovým účtem. React + TypeScript + Tailwind v4 + shadcn/ui (Vite).

## Spuštění

```bash
npm install
npm run dev      # dev server
npm run build    # produkční build
npm run preview  # náhled buildu
```

nebo zkrz docker

```bash
docker compose --profile dev up
```

## DEMO

- Demo uživatel: `demo@paymount.eu`
- Demo heslo: `password`

## Techstack & rozhodnutí které jsem udělal

- Appka je malá, ale stavěl jsem ji, jako by měla škálovat:
  - i18n
  - route guard na login
  - react-hook-form + zod na formulář
  - protože se tyhle věci těžko dolepují zpětně a chtěl jsem ukázat solidní základ
- Použil jsem Tanstack Query, což je taky robustní knihovna, ale dává to výhledově smysl, řeší:
  - refetch
  - server state
  - stavy (pro skeletony, pro oznámení o chybě)
  - retry
  - mutace (invalidace)
  - má vlastní dev tools
  - (to vše bude nutné, pokud se apka rozroste)
- Eslint pro čistý kód

## API

Uvažoval jsem jednoduché api

- `/transactions` - vrací transakce na základě filtru
- `/balance` - vrací balance jednotlivých účtů (tohle je asi změna oproti zadání, nicméně backend server bude mít taky snapshoty stavu účtů, které bude vracet)

Připravil jsem ke generátoru modul, který simuluje backend store, je to tento:

- `src\api\mock-server\ledger.ts` - představuje store pro transakce a balances

Volání jednotlivých "api calls" (simulované zpoždění) jsou tady:

- `src\api\transactions\get-transactions.ts`
- `src\api\balance\get-balance.ts`
- `src\api\auth\login.ts` (Login je řešení jednoduše, uloží se "token" a pokud ho uživatel má, tak je vpuštěn přes guard dál do apky)

## Struktura projektu

```
src/
├── api/                  # data-fetching (TanStack Query)
│   ├── auth/             # login.ts + key factory (Simulace auth endpointu)
│   ├── balance/          # get-balance.ts (Simulace balance endpointu)
│   ├── transactions/     # get-transactions.ts (Simulace endpointu transakcí)
│   └── mock-server/      # ledger.ts — simulovaný backend store
├── components/
│   ├── ui/               # shadcn primitivy (button, table, select, …)
│   ├── common/           # sdílené komponenty napříč stránkami (QueryError)
│   ├── forms/            # formuláře (login-form)
│   ├── dashboard/        # komponenty stránky Dashboard
│   ├── transactions/     # komponenty stránky Transakce (tabulka, filtry, badge)
│   ├── app-sidebar/      # navigace + uživatelské menu
│   ├── skeleton/         # loading skeletony (členěné dle stránky)
│   └── animation/        # Animační komponenty, aktuálně jen jedna - PriceAnimate
├── pages/                # routované stránky (Dashboard, Transactions, Account, Login)
├── layouts/              # AppLayout (sidebar) + AuthLayout
├── guards/               # route guardy (ProtectedRoute / GuestRoute)
├── providers/            # context providery (auth, theme, query)
├── hooks/                # vlastní hooky (use-mobile)
├── lib/                  # čisté helpery (format-money, sort/filter/paginate, compute-balances, generátor)
├── types/                # sdílené typy (rozdělené po modulech)
├── enums/                # enumy — (rozdělené po modulech)
├── config/               # konstanty platformy (latence, page size, …)
├── defaults/             # výchozí stavy/volby (DEFAULT_*)
├── errors/               # typované error třídy
└── i18n/                 # i18next setup + locales (cs, en)
```

### Obecně mám pár pravidel:

- pokud je komponenta vázána k něčemu (třeba ke stránce), tak je v kontextu složky pojmenované po té stránce (např dashboard)
- pokud je komponenta pouze UI prvek, je ve složce UI
- pokud je to derivovaná věc z UI nebo čistě stylovaná, ale obecná tak je v common
- stejně kontextově skeleton pro skeletony, forms pro všechny formuláře atd...
- data typy, enumy a vše co by se rozrostlo do velké hromady tak rozděluju do modulů a držím při sobě, import je pak velmi jednoduchý `@/types/cokoliv...`
- Velmi rád udržuju vše typované, včetně errorů, na ty se pak dají psát obslužné metody a zachycení zautomatizovat např. do toastu

## Co je potřeba vědět

- Refetch jede zkrz "simulovaný REST API", běžně zvolíme spíš websockety, spolu se spoustu dalších eventů jako notifikace, health a podobně
- Funguje 30s cache pro API calls, proto když vyfiltrujete transakce a vrátíte filtr zpět tak vidíte výsledky okamžitě bez "zpoždění", není to bug, je to feature nicméně tohle je něco co je potřeba invalidovat, pokud příjde WS event s novou transakcí například (což se přes mutaci dělá automaticky takže)

## Co bych vylepšil

- Například tam není debounce (hitujete search a posílá requesty na každý hit)
- Řešení stavu kdy je uživatel offline nebo spadl server, je potřeba to komunikovat
- Testy uplně chybí
- Stav filtrů v url
- ARIA / A11y pro velké aplikace je legislativní nutnost
- S backenďákem bych vymyslel error shape, ať je lépe deskriptivní
- Error handling a komunikace chybových sdělení uživateli
- Mnoho z config values by šlo z envs nebo z nějakého platform settings endpointu
- Zod knihovnu bych použil i na validaci typů přicházejících z BE
- Přidal bych observability tools (metrics, logs and traces)
- V zadání jsem si nebyl jistý co přesně je myšleno souhrnem pohybů na účtu (asi součet bilance na stránce s transakcemi? pokud ano, tak řešení by bylo relativně jednoduché, agregace vypsaných transakcí)
