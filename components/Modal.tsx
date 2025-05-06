import { Modal, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sprites from './Sprites';
import { router } from 'expo-router';

async function countdown(seconds: number, onTick: (remaining: number) => void, onComplete: () => void) {
  for (let i = seconds; i > 0; i--) {
    onTick(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  onComplete();
}

const ModalView = ({showSprites}:{showSprites?: boolean}) => {
  const [countdownValue, setCountdownValue] = useState<number | null>(null);

  useEffect(() => {
    // Start the countdown when the component mounts
    countdown(
      3, // Countdown from 3 seconds
      (remaining) => setCountdownValue(remaining), // Update the countdown value
      () => {
        setCountdownValue(null); // Clear countdown value
      }
    );
  }, []);

  // useEffect(() => {
  //   // Redirect when countdownValue becomes null
  //   if (countdownValue === null) {
  //     router.replace("/(auth)/signin");
  //   }
  // }, [countdownValue]);

  return (
    <Modal transparent={true} animationType="fade">
      <View style={{ position: "absolute", flex: 1, zIndex: 9999 }}>
        {showSprites && <Sprites />}
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: "80%",
          }}
        >
          <Text style={{ fontFamily: "Satoshi-Bold", fontSize: 18, textAlign: 'left' }}>
            Thanks for registering with us!
          </Text>
          <Text style={{ fontFamily: "Satoshi-Regular", fontSize: 11, color: 'gray', textAlign: 'left' }}>
            {countdownValue !== null
              ? `You'll be redirected to the sign-in page in ${countdownValue} sec${countdownValue > 1 ? 's' : ''}.`
              : "Redirecting..."}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalView;