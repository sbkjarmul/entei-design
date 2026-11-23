# Płatności PayU

Płatności online za usługi z cennika `/agency` (hosted checkout PayU, przekierowanie).
Zamiast PHP z instrukcji PayU logika działa w Next.js na Vercelu, w tej samej domenie (bez CORS i osobnego API).

## Przepływ

1. Cennik `/agency#cennik` → „Zamów i zapłać online” → `/agency/zamowienie/<produkt>` (`meta-ads`, `branding`).
2. Formularz → server action [`createPayuOrderAction`](../src/actions/create-payu-order.ts):
   walidacja (zod + honeypot + timing), **kwota liczona po stronie serwera** z [`products.ts`](../src/lib/payu/products.ts),
   utworzenie zamówienia w PayU (OAuth `client_credentials` → `POST /api/v2_1/orders`), e-mail „Nowe zamówienie” do ENTEI z danymi do faktury.
3. Klient płaci na stronie PayU → wraca na `/agency/zamowienie/status` (`continueUrl`). Powrót **nie** jest dowodem płatności.
4. PayU wysyła notyfikację na `/api/payu/notify` (podpis `OpenPayu-Signature`, MD5 z drugiego klucza).
   Przy `COMPLETED`: e-mail z potwierdzeniem umowy do klienta (trwały nośnik) i e-mail „Zamówienie opłacone” do ENTEI.

Bazy danych nie ma: rejestrem zamówień jest panel PayU, numer zamówienia `ENT-<MA|BR>-…` łączy oba e-maile.
Danych do faktury celowo **nie** wysyłamy do PayU (pola opisu trafiają do tytułu przelewu).

## Konfiguracja w panelu PayU (Dodawanie sklepu)

1. **Krok 1, dane sklepu:** adres strony `https://www.entei.design` (dopóki `agency.entei.pl` nie działa), nazwa `ENTEI`, waluta PLN.
2. **Krok 2, punkt płatności:** typ **REST API (Checkout)**.
3. **Krok 3, klucze:** skopiuj do Vercel → Project → Settings → Environment Variables (Production):

| Zmienna | Skąd |
|---|---|
| `PAYU_ENV` | `production` (sandbox: `sandbox` lub brak) |
| `PAYU_POS_ID` | Id punktu płatności (pos_id) |
| `PAYU_CLIENT_ID` | Protokół OAuth: client_id |
| `PAYU_CLIENT_SECRET` | Protokół OAuth: client_secret |
| `PAYU_SECOND_KEY` | Drugi klucz (MD5) |

`RESEND_API_KEY` jest już ustawiony (formularz kontaktowy). Kluczy nie wklejaj do kodu ani do czatu.
Bez zmiennych `PAYU_*` formularz pokazuje komunikat „Płatności chwilowo niedostępne”.

## Testy

Lokalnie w `.env.local` (gitignored) można użyć publicznego POS-a sandboxa z
[dokumentacji PayU](https://developers.payu.com/europe/docs/testing/sandbox/) (`300746`).
Sandbox nie dostanie się do `localhost`, więc notyfikacje testuj na Vercel Preview albo ręcznie
(podpis: `md5(body + PAYU_SECOND_KEY)`). Testowe metody: BLIK `777123`, karta `4444 3333 2222 1111`, CVV `123`.

## Przed zgłoszeniem sklepu do weryfikacji

- [x] REGON i telefon w [`src/lib/company.ts`](../src/lib/company.ts) i tekstach `legal.*`.
- [ ] Prawnik przegląda `/regulamin` i `/zasady-zakupow` (teksty: `legal.terms`, `legal.purchase` w `messages/pl.json`).
- [ ] Potwierdź warunki usług na stronie zamówienia (terminy realizacji, rundy poprawek): `agency.order.products`.
- [ ] Oficjalne logotypy PayU / BLIK / Visa / Mastercard z panelu PayU do `public/images/payments/` i podpięcie w [`PaymentMethods`](../src/app/agency/components/order/PaymentMethods.tsx).
- [ ] Zmienne `PAYU_*` w Vercel, deploy, testowe zamówienie z prawdziwą płatnością i zwrotem z panelu PayU.
