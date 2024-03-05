## Installation guide: server

### `cd test-task-server`

#### 1. `npm ci`

#### 2. create .env file and paste DATABASE_URL from .env.template

#### 3. `npm run database`

#### 4. `npx prisma generate`

#### 5. `npx prisma migrate dev`

#### 6. `npx prisma db seed`

#### 7. `npm run start:dev`

#### 8. open http://localhost:8080 and check api

## Installation guide: front-end

### `cd test-task-front`

#### 1. `npm ci`

#### 2. `npm run dev`
