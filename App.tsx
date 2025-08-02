import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import mobileAds from 'react-native-google-mobile-ads';
import AdBanner from './src/components/AdBanner';

// En popüler döviz çiftleri (Türk pazarı için)
const CURRENCIES = [
  {code: 'TRY', name: 'Türk Lirası', flag: '🇹🇷', popular: true},
  {code: 'USD', name: 'ABD Doları', flag: '🇺🇸', popular: true},
  {code: 'EUR', name: 'Euro', flag: '🇪🇺', popular: true},
  {code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧', popular: true},
  {code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭', popular: true},
  {code: 'SAR', name: 'Suudi Riyali', flag: '🇸🇦', popular: true},
  {code: 'AED', name: 'BAE Dirhemi', flag: '🇦🇪', popular: true},
  {code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵', popular: false},
  {code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦', popular: false},
  {code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺', popular: false},
  {code: 'CNY', name: 'Çin Yuanı', flag: '🇨🇳', popular: false},
  {code: 'RUB', name: 'Rus Rublesi', flag: '🇷🇺', popular: false},
];

interface ExchangeRates {
  [key: string]: number;
}

const App = (): React.JSX.Element => {
  const [fromCurrency, setFromCurrency] = useState('TRY');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Ücretsiz döviz API'si kullanarak kurları çek
  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // exchangerate-api.com ücretsiz servisi (günde 1500 istek)
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/TRY'
      );
      const data = await response.json();
      
      if (data.rates) {
        setExchangeRates(data.rates);
        setLastUpdated(new Date().toLocaleTimeString('tr-TR'));
      }
    } catch (error) {
      console.error('Döviz kurları alınamadı:', error);
      Alert.alert('Hata', 'Döviz kurları şu anda alınamıyor. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  // Döviz çevirimi hesapla
  const convertCurrency = () => {
    if (!exchangeRates || !amount) return;
    
    const fromRate = fromCurrency === 'TRY' ? 1 : exchangeRates[fromCurrency] || 1;
    const toRate = toCurrency === 'TRY' ? 1 : exchangeRates[toCurrency] || 1;
    
    // TRY bazında hesaplama
    const amountInTRY = parseFloat(amount) / fromRate;
    const converted = amountInTRY * toRate;
    
    setConvertedAmount(converted.toFixed(4));
  };

  // Döviz çiftlerini değiştir
  const swapCurrencies = () => {
    const tempFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempFrom);
  };

  useEffect(() => {
    // AdMob'u başlat
    mobileAds().initialize();
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💱 Türk Döviz</Text>
        <Text style={styles.headerSubtitle}>Anlık Döviz Kurları</Text>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>Son güncelleme: {lastUpdated}</Text>
        )}
      </View>

      <ScrollView style={styles.content}>
        {/* Banner Reklam */}
        <AdBanner />
        
        {/* Converter Section */}
        <View style={styles.converterContainer}>
          <Text style={styles.sectionTitle}>Döviz Çevirici</Text>
          
          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Miktar</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Miktar girin"
            />
          </View>

          {/* From Currency */}
          <View style={styles.currencyContainer}>
            <Text style={styles.currencyLabel}>Kaynak Para Birimi</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fromCurrency}
                onValueChange={setFromCurrency}
                style={styles.picker}>
                {CURRENCIES.map(currency => (
                  <Picker.Item
                    key={currency.code}
                    label={`${currency.flag} ${currency.code} - ${currency.name}`}
                    value={currency.code}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
            <Text style={styles.swapButtonText}>⇅ Değiştir</Text>
          </TouchableOpacity>

          {/* To Currency */}
          <View style={styles.currencyContainer}>
            <Text style={styles.currencyLabel}>Hedef Para Birimi</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={toCurrency}
                onValueChange={setToCurrency}
                style={styles.picker}>
                {CURRENCIES.map(currency => (
                  <Picker.Item
                    key={currency.code}
                    label={`${currency.flag} ${currency.code} - ${currency.name}`}
                    value={currency.code}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Result */}
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Sonuç</Text>
            <Text style={styles.resultAmount}>
              {convertedAmount} {toCurrency}
            </Text>
            <Text style={styles.resultRate}>
              1 {fromCurrency} = {
                fromCurrency === 'TRY' 
                  ? (exchangeRates[toCurrency] || 0).toFixed(4)
                  : toCurrency === 'TRY'
                  ? (1 / (exchangeRates[fromCurrency] || 1)).toFixed(4)
                  : ((exchangeRates[toCurrency] || 0) / (exchangeRates[fromCurrency] || 1)).toFixed(4)
              } {toCurrency}
            </Text>
          </View>

          {/* Refresh Button */}
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={fetchExchangeRates}
            disabled={loading}>
            <Text style={styles.refreshButtonText}>
              {loading ? '🔄 Güncelleniyor...' : '🔄 Kurları Güncelle'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Popular Rates Section */}
        <View style={styles.ratesContainer}>
          <Text style={styles.sectionTitle}>Popüler Kurlar (TRY Bazında)</Text>
          {CURRENCIES.filter(c => c.popular && c.code !== 'TRY').map(currency => (
            <View key={currency.code} style={styles.rateItem}>
              <Text style={styles.rateLabel}>
                {currency.flag} 1 {currency.code}
              </Text>
              <Text style={styles.rateValue}>
                ₺{exchangeRates[currency.code] ? (1 / exchangeRates[currency.code]).toFixed(4) : '-.----'}
              </Text>
            </View>
          ))}
        </View>

        {/* Alt Banner Reklam */}
        <AdBanner />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e40af',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#93c5fd',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  converterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  amountInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  currencyContainer: {
    marginBottom: 16,
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  picker: {
    height: 50,
  },
  swapButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  swapButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#0369a1',
    marginBottom: 8,
  },
  resultAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c4a6e',
    marginBottom: 4,
  },
  resultRate: {
    fontSize: 12,
    color: '#0369a1',
  },
  refreshButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  ratesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rateLabel: {
    fontSize: 16,
    color: '#374151',
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
});

export default App;