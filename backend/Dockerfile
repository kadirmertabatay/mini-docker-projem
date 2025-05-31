# Node.js'in LTS (Long Term Support) sürümünü temel al
FROM node:18-alpine

# Uygulama için çalışma dizini oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json (varsa) kopyala
# Bağımlılıkları daha verimli cache'lemek için önce bunları kopyala
COPY package*.json ./

# Uygulama bağımlılıklarını yükle
# Production ortamında sadece production bağımlılıklarını yüklemek için --only=production kullanılabilir
# Ama geliştirme için devDependencies de gerekebilir (örn: nodemon)
RUN npm install

# Uygulama kaynak kodunu kopyala
COPY . .

# Uygulamanın çalışacağı portu belirt (docker-compose.yaml'da map edilecek)
EXPOSE 3000

# Uygulamayı başlatmak için komut
# Geliştirme için nodemon, production için node server.js kullanılabilir
CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "start" ] // Production için