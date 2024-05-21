
# How to run the project

This are the commands you should use to run the project.

seccion 9 del curso de next js

usamos docker para crear una base de datos con postgres

creamos un rest api con nextjs

## Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

docker compose up -d

2. Crear uan copia de el env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install```
5. Ejecutar el comando ```npm run dev```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```
1. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)



### Prima commands 

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Prod

## Stage
