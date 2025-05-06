import { Modal, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sprites from './Sprites';
import Header from './Header';
import Header2 from './Header2';
import { Controller, useForm } from 'react-hook-form';
import Button from './Button';
import { colors } from '@/constants';
import { router } from 'expo-router';
import InputBox from './InputBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const registerData = [
  { key: "State", label: 'State', placeholder: "E.g Abuja" },
  { key: "LGA", label: "LGA", placeholder: "Enter LGA"},
  { key: "Ward/Community", label: "Ward/Community", placeholder: "Enter word or community" },
  { key: "Census Date", label: "Census Date", placeholder: "DD/MM/YY" },
  { key: "Gender", label: "Gender", placeholder: "Male/Female" },
];

async function countdown(seconds: number, onTick: (remaining: number) => void, onComplete: () => void) {
  for (let i = seconds; i > 0; i--) {
    onTick(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  onComplete();
}

const AddData = ({onClose}) => {
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
const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    // setLoading(true)
    try {
      setLoading(true);
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal transparent={true} animationType="fade">
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
          <Header2 onPress={onClose} title='Let’s create new account' message='Create an account by filling in the data below'/>
          <View style={{marginTop: 10}}>
                      { registerData.map((item: any) => (
                    <Controller
                      key={item.key}
                      control={control}
                      name={item.key}
                      rules={item.key === "email"
                        ? {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/,
                              message: "Invalid email",
                            },
                          }
                        : item.key === "password"
                        ? {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Minimum 6 characters",
                            },
                          }
                        : registerData.map(data => data.key).includes(item.key)
                          ? { required: "*" }
                          : {}
                      }
                      render={({ field: { onChange, onBlur, value } }) => (
                    <InputBox
                      onBlur={onBlur}
                      disabled={item.key === "type"}
                      value={value}
                      label={item.label}
                      placeholder={item?.placeholder}
                      onChangeText={onChange}
                      error={errors[item.key]?.message}
                      containerStyle={{marginBottom: 10}}
                          />
                  )}
                    />
                      ))}
                      <Text>Proceed to next page</Text>
                    <View style={{ marginVertical: 10}}>
                      <Button
                        disabled={loading}
                        onPress={handleSubmit(onSubmit)}
                        type="normal"
                        color={colors.light.primary}
                        textColor="#000"
                        title={loading ? "Loading..." : "Submit"}
                      />
                    </View>
                  </View>
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddData;