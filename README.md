sudo docker stop my-ai-site
sudo docker rm my-ai-site

# AI Araçları Rehberi - Dockerize Edilmiş Web Uygulaması

Bu proje, çeşitli yapay zeka araçlarını listeleyen ve kategorilere ayıran bir web uygulamasıdır. Uygulama, Docker kullanılarak containerize edilmiş olup, bir Nginx frontend servisi, Node.js/Express backend API servisi ve MongoDB veritabanı servisinden oluşmaktadır.

Bu proje, Açık Kaynak dersi kapsamında [Kadir Mert Abatay tarafından geliştirilmiştir.

[![Lisans: Apache 2.0](https://img.shields.io/badge/Lisans-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Docker Hub](https://img.shields.io/docker/pulls/kullaniciadin/mini-proje-frontend.svg)](https://hub.docker.com/r/[kullaniciadin]/mini-proje-frontend) <!-- Docker Hub linkini güncelle -->

<!-- İstersen backend imajı için de bir badge ekleyebilirsin -->

## ✨ Özellikler

* Popüler AI araçlarının listelenmesi.
* Araçların kategorilere göre gruplandırılması.
* Her kategori için detaylı araç listesi.
* Araçlar arasında arama yapabilme.
* Kategori detay sayfasında araçları filtreleme ve sıralama (Fiyat, Popülerlik, Yenilik, İsim).
* Duyarlı (responsive) tasarım.
* Docker ve Docker Compose ile kolay kurulum ve çalıştırma.

## 🚀 Teknolojiler

**Frontend:**

* HTML5
* CSS3 (Flexbox, Grid)
* Vanilla JavaScript (DOM Manipulation, Fetch API)
* **Sunucu:** Nginx (Dockerize edilmiş)

**Backend (API):**

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* **Sunucu:** Node.js (Dockerize edilmiş)

**Veritabanı:**

* MongoDB (Dockerize edilmiş)

**Containerization & Orkestrasyon:**

* Docker
* Docker Compose

## 🏗️ Proje Yapısı

sudo docker-compose up

sudo docker-compose up -d

sudo docker-compose down

**mini-docker-projem/**
├── frontend/ # Statik frontend dosyaları (HTML, CSS, JS, assets)
│ ├── assets/
│ │ ├── css/
│ │ ├── js/
│ │ └── images/
│ ├── pages/
│ └── index.html
├── backend/ # Node.js API servisi
│ ├── models/ # Mongoose şemaları (Tool.js, Category.js)
│ ├── routes/ # API endpoint tanımları (toolsRoutes.js, categoriesRoutes.js)
│ ├── Dockerfile # Backend servisi için Dockerfile
│ ├── package.json
│ └── server.js # Ana API sunucu dosyası
├── scripts/ # Yardımcı scriptler
│ └── seed\_db.js # Veritabanını ilk verilerle doldurma script'i
├── Dockerfile # Frontend (Nginx) servisi için Dockerfile
├── compose.yaml # Docker Compose yapılandırma dosyası (veya docker-compose.yaml)
├── .dockerignore # Ana Docker build context'i için ignore dosyası
├── README.md # Bu dosya
└── LICENSE # Apache 2.0 Lisansı



## ⚙️ Kurulum ve Çalıştırma

Bu projeyi lokal makinenizde çalıştırmak için Docker ve Docker Compose'un kurulu olması gerekmektedir.

1. **Projeyi Klonlayın (veya İndirin):**

   ```bash
   git clone https://github.com/[kullaniciadin]/[repo-adin].git
   cd [repo-adin]
   ```
2. **(Opsiyonel) Veritabanını İlk Verilerle Doldurma (Seeding):**
   Eğer veritabanını ilk kez oluşturuyorsanız ve başlangıç verileriyle doldurmak istiyorsanız, `scripts/seed_db.js` script'ini çalıştırabilirsiniz. Bu script, `frontend/assets/js/data_for_seed.js` ve `frontend/assets/js/category_data_for_seed.js` dosyalarındaki verileri kullanır.

   * Öncelikle sadece MongoDB container'ını başlatın:
     ```bash
     sudo docker-compose up -d mongodb
     ```
   * Ana proje dizininde (`[repo-adin]/`) aşağıdaki komutları çalıştırın (Node.js lokalde kurulu olmalı):
     ```bash
     npm install mongoose # Sadece bu script için gerekli
     node scripts/seed_db.js
     ```
   * Seeding işlemi bittikten sonra MongoDB container'ını durdurabilirsiniz veya tüm sistemi başlatabilirsiniz.
     ```bash
     # sudo docker-compose stop mongodb # İsteğe bağlı
     ```

   *Not: API ilk çalıştığında da veritabanını oluşturur (boş olarak).*
3. **Docker Compose ile Uygulamayı Başlatın:**
   Projenin ana dizininde aşağıdaki komutu çalıştırın:

   ```bash
   sudo docker-compose up --build -d
   ```

   * `--build`: İmajları (yeniden) oluşturur.
   * `-d`: Servisleri arka planda (detached modda) çalıştırır.
4. **Uygulamaya Erişin:**

   * **Frontend (AI Araçları Rehberi):** Tarayıcınızda `http://localhost:8080` adresine gidin.
   * **Backend API (Test için):**
     * Tüm araçlar: `http://localhost:3000/api/tools`
     * Tüm kategoriler: `http://localhost:3000/api/categories`
     * API test endpoint'i: `http://localhost:3000/api/test`
5. **Uygulamayı Durdurmak İçin:**

   ```bash
   sudo docker-compose down
   ```

   Bu komut, çalışan container'ları durdurur ve kaldırır. Veritabanı verileri (`db_data` volume'ü sayesinde) korunacaktır. Volume'ü de kaldırmak isterseniz `sudo docker-compose down -v` kullanabilirsiniz.

## 🐳 Docker Hub İmajları

Bu projenin servisleri için oluşturulan Docker imajlarına aşağıdaki linklerden erişebilirsiniz:

* **Frontend (Nginx):** `https://hub.docker.com/r/[kullaniciadin]/mini-proje-frontend`
* **Backend (API):** `https://hub.docker.com/r/[kullaniciadin]/mini-proje-backend`

Bu imajları doğrudan çekerek de (pull) kullanabilirsiniz, ancak `docker-compose.yaml` dosyası tüm servisleri bir arada yönetmek için önerilir.

## 🛠️ API Endpoint'leri (Örnekler)

* `GET /api/test`: API'nin çalışıp çalışmadığını test eder.
* `GET /api/categories`: Tüm kategorileri listeler.
* `GET /api/categories/:id`: Belirli bir ID'ye sahip kategoriyi getirir.
* `GET /api/tools`: Tüm araçları listeler.
  * `GET /api/tools?category=<category_id>`: Belirli bir kategoriye ait araçları listeler.
  * `GET /api/tools?isPopular=true`: Popüler araçları listeler.
  * `GET /api/tools?_limit=<sayi>`: Belirli sayıda araç getirir (API'nizin bu parametreyi desteklemesi gerekir).
  * `GET /api/tools?q=<arama_terimi>`: Arama yapar (API'nizin bu parametreyi desteklemesi gerekir).
* `GET /api/tools/:id`: Belirli bir ID'ye sahip aracı getirir.

## 🔧 Geliştirme

* **Frontend:** `frontend/` klasöründeki HTML, CSS ve JavaScript dosyalarını düzenleyebilirsiniz. Değişikliklerin görünmesi için tarayıcıyı yenilemeniz yeterlidir (Nginx dosyaları doğrudan sunar).
* **Backend:** `backend/` klasöründeki Node.js/Express kodlarını düzenleyebilirsiniz. `docker-compose.yaml` dosyasında backend servisi için volume (`./backend:/usr/src/app`) tanımlı olduğu için, kod değişiklikleri yaptığınızda `nodemon` (eğer `CMD ["npm", "run", "dev"]` kullanılıyorsa) sunucuyu otomatik olarak yeniden başlatacaktır. Eğer `CMD ["npm", "start"]` kullanılıyorsa, değişikliklerin etkili olması için `sudo docker-compose restart backend` yapmanız veya `sudo docker-compose up --build -d` ile sistemi yeniden başlatmanız gerekebilir.

## 🤝 Katkıda Bulunma

Katkılarınız için teşekkürler! Lütfen `CONTRIBUTING.md` dosyasını inceleyin.

1. Projeyi fork edin.
2. Yeni bir branch oluşturun (`git checkout -b ozellik/yeni-bir-ozellik`).
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni bir özellik eklendi'`).
4. Branch'inizi push edin (`git push origin ozellik/yeni-bir-ozellik`).
5. Bir Pull Request oluşturun.

## 📜 Lisans

Bu proje Apache License 2.0 lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

---

171422011
31.05.2025
