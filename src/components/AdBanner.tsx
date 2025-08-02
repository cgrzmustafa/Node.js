import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

interface AdBannerProps {
  size?: BannerAdSize;
}

const AdBanner: React.FC<AdBannerProps> = ({size = BannerAdSize.BANNER}) => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={TestIds.BANNER} // Test ID - Production'da gerçek ID kullanın
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default AdBanner;