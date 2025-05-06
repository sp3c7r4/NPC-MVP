import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants'
import Header from '@/components/Header'
import InputBox from '@/components/InputBox'
import Button from '@/components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Controller, useForm} from 'react-hook-form'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import ModalView from '@/components/Modal'

const registerData = [
  { key: "email", label: "Email", placeholder: "E.g john@npc.gov.ng" },
  { key: "password", label: "Password", placeholder: "Enter your password" },
];


const signin = () => {
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
    <SafeAreaView style={{backgroundColor: colors.light.background_black, flex: 1, paddingHorizontal: 16}}>
      <Header onPress={() => router.replace("/(onboarding)")} title='Let’s sign you in' message='You can enter your email and password below'/>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1}}>
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
            placeholder={item.placeholder}
            onChangeText={onChange}
            error={errors[item.key]?.message}
            containerStyle={{marginBottom: 10}}
                />
        )}
          />
            ))}
          <View style={{ marginVertical: 10, marginBottom: 100 }}>
            <Button
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              type="normal"
              color={colors.light.primary}
              textColor="#000"
              title={loading ? "Loading..." : "Sign In"}
            />
            <View style={{flexDirection: "row", alignItems: "baseline", justifyContent: "center"}}>
              <Text style={{textAlign: "center", color: "#fff", marginVertical: 10}}>Already have an account. </Text>
              <Pressable onPress={() => router.navigate("/(auth)/signup")}>
                <Text style={{textAlign: "center", color: colors.light.primary}}>Register</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <ModalView/> */}
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default signin