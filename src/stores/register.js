import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegisterStore = defineStore("registerStore", () => {
  const username = ref();
  const password = ref();
  const confirmPassword = ref();
  const email = ref();
  const firstName = ref();
  const lastName = ref();
  const country = ref(null);
  const identityCode = ref();
  const dateOfBirth = ref();
  const phoneNumber = ref(null);
  const policyAgreement = ref(false);

  const registerAccount = () => {
    const requestBody = {
      username: username.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      country: country.value?.name,
      identityCode: identityCode.value,
      dateOfBirth: dateOfBirth.value,
      phoneNumber: phoneNumber.value,
      policyAgreement: policyAgreement.value,
    };

    // AuthAPI.registerAccount with requestBody

    console.log(requestBody);

    return { status: 200 };
  };

  return {
    username,
    password,
    confirmPassword,
    email,
    firstName,
    lastName,
    country,
    identityCode,
    dateOfBirth,
    phoneNumber,
    policyAgreement,
    registerAccount,
  };
});
