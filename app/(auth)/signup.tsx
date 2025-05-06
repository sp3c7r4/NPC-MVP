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
  { key: "firstname", label: "Firstname", placeholder: "E.g John" },
  { key: "lastname", label: "Lastname", placeholder: "E.g Doe" },
  { key: "email", label: "Email", placeholder: "E.g john@npc.gov.ng" },
  { key: "mobile", label: "Mobile", placeholder: "E.g +2348165918482" },
  { key: "password", label: "Password", placeholder: "Enter your password" },
];

async function onSubmit() {

}
const signup = () => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
  });
  return (
    <SafeAreaView style={{backgroundColor: colors.light.background_black, flex: 1, paddingHorizontal: 16}}>
      <Header onPress={() => router.back()} title='Let’s create new account' message='Create an account by filling in the data below'/>
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
              onPress={handleSubmit(onSubmit)}
              type="normal"
              color={colors.light.primary}
              textColor="#000"
              title={loading ? "Loading..." : "Sign Up"}
            />
            <View style={{flexDirection: "row", alignItems: "baseline", justifyContent: "center"}}>
              <Text style={{textAlign: "center", color: "#fff", marginVertical: 10}}>Already have an account. </Text>
              <Pressable onPress={() => router.navigate("/(auth)/signin")}>
                <Text style={{textAlign: "center", color: colors.light.primary}}>Login</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <ModalView/> */}
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default signup