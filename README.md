# SPA для IT Global Meetup

- [Quick start](#quick-start)
- [Contributors](#contributors)

## Quick start

- создать бокс в [aidbox.app](https://aidbox.app)
  - FHIR v4.0.0
  - Zone: US Central (GCP)
- открыть бокс
- перейти в вкладку `Auth Clients` и нажать **New**
- в открывшемся вставить следующий код

```yaml
secret: my-super-secret-change-me
first_party: true
grant_types:
  - client_credentials
  - basic
id: app-init
resourceType: Client
```

- нажать **Save**
- возвращаемся в `Auth Clients`
- Создаем еще 1 ресурс

```yaml
auth:
  authorization_code:
    redirect_uri: 'http://localhost:1234/login'
first_party: true
grant_types:
  - authorization_code
id: ui
resourceType: Client
```

- нажать **Save**
- перейти в вкладку `Access Control` и нажать **New**

```yaml
link:
  - id: app-init
    resourceType: Client
engine: allow
id: app-init
resourceType: AccessPolicy
```

- нажать **Save**
- далее нам необходимо подключить провайдера для авторизации для разработки мы будем использовать `github`
- идем на страницу [https://github.com/settings/applications/new](https://github.com/settings/applications/new)
  - Application name: ITGM Dev
  - Homepage URL: #BOX_URL#
  - Authorization callback URL: #BOX_URL#/auth/callback/github
- сохраняем себе **Client ID** и **Client Secret**
- переходим во вкладку `REST Console` и вписываем

```yaml
PUT /IdentityProvider/github

type: github
client:
  id: #client-id#
  secret: #client-secret#
id: github
resourceType: IdentityProvider
```

- бокс готов к конфигурации
- устанавливаем зависимости `npm i`
- копируем env `cp .env.tpl .env`
- меняем `APP_URL` на адрес нашего бокса
- вписываем наш секрет из первого ресурс в env `APP_INIT_CLIENT_SECRET`
- конфигурируем наш бокс `npm run configure`
- запускаем приложение `npm run start`
- можно начинать работать

## Contributors

[<img alt="Realetive" src="https://avatars1.githubusercontent.com/u/2073959?v=4&s=117" width="117">](https://github.com/Realetive) [<img alt="mike1pol" src="https://avatars3.githubusercontent.com/u/584816?v=4&s=117" width="117">](https://github.com/mike1pol)
