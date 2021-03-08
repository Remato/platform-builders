![Platform_Builders](https://platformbuilders.io/assets/images/logo.png)
# Teste Platform Builders
### Desenvolva um aplicativo que consuma a localização atual do usuário e exiba na interface o endereço atual os dados climáticos da região e um botão para atualizar os dados.

    Para fazer essa busca, pode-se usar a API do Open Weather Map: http://api.openweathermap.org/

## Breve Descrição
**App:** ao ser iniciado pede permissão para uso da localização do dispositivo, caso seja concedida envia 2 requisições para API's diferentes, [OpenWeather](api.openweathermap.org/) e [LocationIQ](https://locationiq.com/sandbox/geocoding/reverse)

>com o dados de latitude e longitude providos pelo GPS do dispositivo, é disparado uma requisição **GET** para capturar os dados do clima do local e para retornar a Geolocalização reversa.

## Documentação

  * /src/services/reverseGeolocation.ts
    ```ts
      const api = axios.create({
        baseURL: `https://us1.locationiq.com/v1/reverse.php?&format=json`,
        params: {
          key: keys.reverseGeolocationKey,
        },
      });
    ```
    >O service acima retorna o endereço do usuário em formato JSON usando a API_key localizada nas pasta de configuração /src/config
  * /src/services/weatherApi.ts
    ```ts
      const api = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather`,
        params: {
          appid: keys.weatherKey,
          units: 'metric',
        },
      });
    ```
    >O service acima retorna as informações sobre o clime no formato das unidades padrões do SI de forma similar à anterior a API_key fica localizada nas pasta de configuração /src/config


## Primeira Execução da aplicação
![Aplicação](https://i.imgur.com/xQ8CmqP.gif)

## Inicialização

[0] - **Clonando repositório**
```bash
git clone https://github.com/Remato/platform-builders.git
```

[1] - **Inicializando em Android**

  ```bash
  yarn android
  ```
  >OBS: Caso não inicialize imediatamente rode o comando adicional abaixo
  ```bash
  yarn start
  ```

[3] - **Inicializando no iOS**
  ```bash
  sudo gem install cocoapods && cd ios/ && pod install && cd .. && yarn ios
  ```
  >OBS: Caso esteja no Mac e já tenha o cocoapods instalado, só ignorar o primeiro comando


## Testes

[x] - Executando testes
```bash
yarn test
```
>Como a aplicação tem apenas a tela de Home, existe apenas 1 teste que gerencia o component princial e seus subcomponents.

![Aplicação](https://i.imgur.com/rO8Tw8u.png)

* **/__tests__/pages/Home.spec.ts** teste principal de renderização da página e de seus subcomponentes.
