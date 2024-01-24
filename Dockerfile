# Usa una imagen base con Node.js
FROM node:18.18.2-slim
#node:18.14.2-slim
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
RUN mkdir -p ./public
# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY . .
# Instala las dependencias del proyecto

RUN npm i
RUN npm i -g ts-node
# Copia el resto de tu aplicación
RUN npm cache clean --force
RUN npm run build
# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 4000
# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "run", "start"]