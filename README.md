- https://codevoweb.com/setup-trpc-api-with-prisma-postgresql-nodejs-reactjs/
- https://codevoweb.com/trpc-api-with-postgres-prisma-nodejs-jwt-authentication/

Create project
- create docker-compose.yml and run docker compose up
- npm install concurrently wsrun --save-dev --ws

Server
- create server folder
- npm i typescript --save-dev && npx tsc --init
- add folder server to workspace in package.json
- ESLint
  - npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  - npx eslint --init
  - npx eslint --fix --ext .ts . 
- Prettier
  - npm install --save-dev prettier
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
- npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  - npx eslint --init
  - npx eslint --fix --ext .ts . 
- npm install @trpc/client@next @trpc/server@next @trpc/react-query@next @tanstack/react-query @tanstack/react-query-devtools
- npm i react-error-boundary
- npm i tailwindcss postcss autoprefixer
- npx tailwindcss init -p
   - postcss.config.js
   - tailwind.config.js
