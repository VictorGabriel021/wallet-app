# Wallet App

Este é um projeto de carteira financeira desenvolvido em Next.js, Node.js, Prisma, e PostgreSQL.

## Configuração do Projeto

### 1. Clone o repositório
git clone https://github.com/VictorGabriel021/wallet-app.git
cd wallet-app/

### 2. Instale as dependências
npm install

### 3. Configuração do arquivo .env
Crie um arquivo .env na raiz do projeto. Você pode usar o arquivo .env-example como base para sua configuração. Certifique-se de preencher as variáveis com suas informações de ambiente.

### 4. Encontrar o IP do Docker
Para configurar corretamente a conexão com o banco de dados, você pode precisar do IP da rede Docker. Siga estas instruções para encontrá-lo:
docker network inspect bridge

### 5. Build e execução do Docker
docker-compose build
docker-compose up

### 6. Executar migrações do Prisma
docker exec -it wallet-app sh
apk add --no-cache postgresql-client
npx prisma migrate dev --name init

### 7. Testar conexão com o banco de dados
psql -h db -U your_user -d your_db

Substitua your_user e your_db pelos valores corretos que você configurou no arquivo .env.

