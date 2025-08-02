# 🚀 Türk Döviz - Play Store Deployment Rehberi

## 1. Pre-Deployment Checklist

### ✅ Uygulama Hazırlığı
- [x] App geliştirmesi tamamlandı
- [x] API entegrasyonu yapıldı
- [x] Reklam entegrasyonu eklendi
- [x] Bundle başarıyla oluşturuldu
- [ ] APK/AAB dosyası oluşturulacak
- [ ] Icon ve grafikler hazırlanacak

### ✅ Play Store Gereklilikleri
- [x] Play Store listing metni hazır
- [x] Uygulama açıklaması yazıldı
- [x] Anahtar kelimeler belirlendi
- [ ] Screenshots alınacak
- [ ] Feature graphic tasarlanacak
- [ ] Privacy policy oluşturulacak

## 2. APK/AAB Build İşlemi

### Adım 1: Release Keystore Oluşturma
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore turkdoviz-release-key.keystore -alias turkdoviz-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Adım 2: Gradle Properties Konfigürasyonu
`android/gradle.properties` dosyasına ekle:
```
MYAPP_RELEASE_STORE_FILE=turkdoviz-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=turkdoviz-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

### Adım 3: Build.gradle Konfigürasyonu
`android/app/build.gradle` dosyasında:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

### Adım 4: Release Build
```bash
cd android
./gradlew assembleRelease
# veya AAB için:
./gradlew bundleRelease
```

## 3. Play Store Assets

### App Icon Requirements
- **Size**: 512x512 px
- **Format**: PNG (32-bit)
- **Background**: Şeffaf olmayan
- **Design**: Minimalist, Türk bayrağı renkleri

### Feature Graphic
- **Size**: 1024x500 px
- **Content**: "Türk Döviz" yazısı, döviz sembolleri
- **Colors**: Mavi-beyaz tema

### Screenshots (Gerekli: 3-8 adet)
1. **Ana ekran**: Converter interface
2. **Kur listesi**: Popular rates
3. **Çevirici**: Calculation result
4. **Settings/About**: App info

### Promo Video (Opsiyonel)
- **Süre**: 30 saniye
- **İçerik**: App özelliklerini tanıtım
- **Format**: MP4, 16:9

## 4. Play Store Listing Optimization (ASO)

### Primary Keywords
1. döviz
2. kur  
3. TL
4. dollar
5. euro

### Secondary Keywords
1. çevirici
2. finans
3. borsa
4. para
5. ekonomi

### Title Optimizasyonu
"Türk Döviz - Anlık Kur Çeviricisi"

### Description Strategy
- İlk 160 karakter kritik (Google Play search'te görünür)
- Emoji kullanımı (%10-15)
- Türkçe ve kullanıcı odaklı dil
- Feature benefits (özellik faydaları)

## 5. Monetization Setup

### AdMob Configuration
1. **Production App ID** al (Test ID yerine)
2. **Banner Ad Unit ID** oluştur
3. **Interstitial Ad Unit ID** oluştur (gelecek güncellemeler için)

### Revenue Tracking
- AdMob dashboard kurulumu
- Google Analytics 4 entegrasyonu
- Firebase kurulumu (user behavior)

## 6. Post-Launch Strategy

### İlk Hafta
- [ ] ASO monitoring
- [ ] Crash reports takibi  
- [ ] User feedback yanıtlama
- [ ] Download sayısı takibi

### İlk Ay
- [ ] A/B test app icon
- [ ] Description optimization
- [ ] Social media promotion
- [ ] App review iyileştirmeleri

### Performance Metrics
- **Install Rate**: >%3
- **Retention Rate**: Day 1 >%25, Day 7 >%10
- **Crash Rate**: <%2
- **Rating**: >4.0 ⭐

## 7. Legal Requirements

### Privacy Policy
```
Türk Döviz Gizlilik Politikası

1. Toplanan Veriler:
   - Cihaz bilgileri (reklam gösterimi için)
   - Uygulama kullanım istatistikleri

2. Üçüncü Taraf Servisler:
   - Google AdMob (reklam)
   - exchangerate-api.com (kur verileri)

3. Veri Paylaşımı:
   - Kişisel veriler paylaşılmaz
   - Anonim istatistikler Google'a gönderilir

4. İletişim:
   privacy@turkdoviz.app
```

### Terms of Service
- Ücretsiz kullanım koşulları
- Reklam gösterimi bildirimi
- API kullanım limitleri

## 8. Marketing Budget

### Minimum Budget ($100-200)
- **ASO Tools**: $20/ay (App Radar, Sensor Tower)
- **Icon Design**: $50 (Fiverr/99designs)
- **Screenshots**: $30 (Canva Pro)
- **Initial Ads**: $100 (Google Ads)

### Growth Budget ($500+)
- **Influencer Marketing**: $200
- **Social Media Ads**: $200  
- **PR/Blog Features**: $100

## 9. Success Metrics

### KPI Hedefleri (3 Ay)
- **Downloads**: 5,000+
- **Active Users**: 1,000+
- **Revenue**: $250+/ay
- **Rating**: 4.2+ ⭐
- **Reviews**: 100+ pozitif

### ROI Calculation
- **Development Cost**: $0 (kendi geliştirme)
- **Marketing Cost**: $200-500
- **Break-even**: 2-3 ay
- **Profit Timeline**: 4-6 ay

---

## 🎯 Next Steps

1. **Release build** oluştur
2. **App assets** hazırla (icon, screenshots)
3. **Play Console** hesap aç ($25 one-time fee)
4. **Privacy policy** yayınla
5. **App upload** et
6. **Store listing** optimize et
7. **Launch** et!

**Başarı için sabır ve sürekli optimizasyon gerekli. İlk aylar organik büyümeye odaklan!**