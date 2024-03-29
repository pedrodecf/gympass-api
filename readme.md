# 💪 GymPass Style App

### RFs (Requisitos funcionais)

- [x] Dever ser possível se cadastrar;
- [x] Dever ser possível se autenticar;
- [x] Dever ser possível obter o perfil de um usuário logado;
- [x] Dever ser possível obter o número de check-ins pelo usuário logado;
- [x] Dever ser possível o usuário obter seu histórico de check-ins;
- [x] Dever ser possível o usuário buscar academias próximas (até 10km);
- [x] Dever ser possível o usuário buscar academias pelo nome;
- [x] Dever ser possível o usuário realizar check-in em uma academia;
- [x] Dever ser possível validar o check-in de um usuário;
- [x] Dever ser possível cadastrar uma academia;

### RNs (Regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuáriio não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser valido por administradores;
- [x] A academia só pode ser cadastrado por administradores;

### RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptograda;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);
