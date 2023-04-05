- https://codevoweb.com/setup-trpc-api-with-prisma-postgresql-nodejs-reactjs/
- https://codevoweb.com/trpc-api-with-postgres-prisma-nodejs-jwt-authentication/

Create project
- create docker-compose.yml and run docker compose up
- npm install concurrently wsrun --save-dev --ws

Server
- create server folder
- npm i typescript --save-dev && npx tsc --init
- add folder server to workspace in package.json
- npm install @trpc/server@next cors dotenv express @prisma/client redis && npm install --save-dev prisma @types/cors @types/express @types/node morgan @types/morgan ts-node-dev
- Prisma
  - npx prisma init
  - npx prisma migrate dev --create-only
  - npx prisma migrate dev / npx prisma db push


Client
- go to root folder and run npm create vite@latest
  - project name: client
  - cd client
  - npm install
  - npm run dev
- install the tRPC server as a library
  npm i --save ../server
- npm install @trpc/client@next @trpc/server@next @trpc/react-query@next @tanstack/react-query @tanstack/react-query-devtools
