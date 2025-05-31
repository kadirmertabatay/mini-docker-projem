# Stage 1: Build (Eğer bir build adımı olsaydı, örn: React, Vue)
# Bu proje statik olduğu için bu adıma şimdilik gerek yok.

# Stage 2: Serve
# Nginx'in resmi imajını kullan
FROM nginx:stable-alpine

# Nginx'in varsayılan ayar dosyasını sil (isteğe bağlı, özel ayar ekleyeceksen)
# RUN rm /etc/nginx/conf.d/default.conf

# Kendi Nginx ayar dosyanı kopyala (isteğe bağlı, şimdilik varsayılan yeterli)
# COPY nginx.conf /etc/nginx/conf.d/

# Statik web sitesi dosyalarını Nginx'in sunacağı dizine kopyala
# ./frontend klasörünün içeriğini Nginx'in html dizinine kopyala
COPY ./frontend/ /usr/share/nginx/html/

# Nginx'in varsayılan olarak 80 portunu dışarı açmasını sağla
EXPOSE 80

# Container başladığında Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]