
## MVC Ticari otomasyon-muhasabe Uygulaması

## Demo

-  [Demo Adresi](https://demo.beytullahtapan.dev) - demo.beytullahtapan.dev
- Kullanıcı Adı: Demo - Şifre: Demo

#  -Kurulum-

## Gereksinimler Ve Hosting Ayarları
- Hosting Sunucusunun : Framework versiyonu 4.8.0 
- Kültür : Turkish (Turkey)
- UI Kültürü : Turkish (Turkey)

Projeyi Repo'dan çekip Hosting'e yükleyebilirsiniz.

```bash
  git clone git@github.com:beytullahtapan/TicariOtomasyon.git
```
## Asp.net Ayarları

Asp.net Ayarları Yazan yere tıklayın:
![1](https://demo.beytullahtapan.dev/img/1.png)

Alt Kısımda Bulunan Kültür Ve UI Kültür Seçeneklerine Tıklayıp Resimde ki Gibi Yapınız:
![2](https://demo.beytullahtapan.dev/img/3.png)

# Veritabanı İşlemleri

- Veritabanı Oluşturun.

-  Veritabanı Sunucusu = SQLSERVER2019 Önerilir.

![4](https://demo.beytullahtapan.dev/img/4.png)

## Tablolaları Veritabanına Aktarma

- Veritabanları Kısmına Tıklayın:

![4](https://demo.beytullahtapan.dev/img/vb1.png)

Dökümü İçeri Aktar Seçenegini Seçip Açılan Pencereden Sql/ Klasöründe ki Yedegi Seçin.
![5](https://demo.beytullahtapan.dev/img/vb2.png)

## Veritabanı Baglantısı Ayarları

- Ana Dizinde bulunan :  Web.config dosyasını açın
- En alt satırda bulunan : connectionString : baglantı ayarlarını bulun
```sql
<add connectionString="Data Source=.\MSSQLSERVER2019;Initial Catalog=VeritabanıAdı;User ID=Kullanıcıadı;Password=KullanıcıŞifresi" name="Context" providerName="System.Data.SqlClient" />
```
## Burada ki ayar.
![4](https://demo.beytullahtapan.dev/img/5.png)
- Kendi Veritabanı Adınızı : Catalog=Veritabanı Adı;
- Kendi Veritabanı Kullanıcı Adınızı : User ID=Kullanıcı Adı;
- Kendi Veritabanı Şifrenizi : Password=Kullanıcı Şifresi

Belirtilen Yerleri Degiştirerek Ayarları Yapınız.

  ## Admin Giriş Bilgileri:
- İlk Kurulum Yapıldığında Admin:Admin Olur.

## Destek

Destek için beytullahrodnes@gmail.com adresine e-posta gönderin veya profil de ki sosyal medya hesaplarından iletişime geçebilirsiniz..
