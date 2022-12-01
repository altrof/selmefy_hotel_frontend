import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllPersons,
  getPersonByIdentityCode,
  addPerson,
} from "../services/modules/PersonAPI";

class Person {
  constructor(idCode, firstName, lastName, dateOfBirth, country, phoneNumber) {
    this.idCode = idCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.phoneNumber = phoneNumber;
  }
}

export const usePersonstore = defineStore("person", () => {
  const responseData = ref(null);
  const peopleInBooking = ref({});
  const firstName = ref(null)
  const lastName = ref(null)
  const dateOfBirth = ref(null)
  const country = ref(null)
  const phoneNumber = ref(null);
  const inputDisabled = ref(false);

  getAllPersons().then((response) => {
    responseData.value = response;
  });

  async function getPersonDataFromDB(identityCode) {
    getPersonByIdentityCode(identityCode).then((response) => {
      const responseData = response["data"]
      if (responseData !== null) {
        firstName.value = responseData["firstName"];
        lastName.value = responseData["lastName"];
        dateOfBirth.value = responseData["dateOfBirth"];
        country.value = responseData["country"];
        phoneNumber.value = responseData["phoneNumber"]
        inputDisabled.value = true
      } else {
        inputDisabled.value = false
      }
    });
  }

  async function addPersonDataToDB(
    identityCode,
    firstName,
    lastName,
    dateOfBirth,
    country
  ) {
    console.log(phoneNumber.value);

    addPerson(
      identityCode,
      firstName,
      lastName,
      dateOfBirth,
      country["name"],
      phoneNumber["value"]
    ).then((response) => {
      console.log(response);
    });
  }

  function addPersonToBooking(
    idCode,
    firstName,
    lastName,
    dateOfBirth,
    country,
    phoneNumber
  ) {
    const currentPerson = new Person(
      idCode,
      firstName,
      lastName,
      dateOfBirth,
      country,
      phoneNumber
    );
    peopleInBooking.value[idCode] = currentPerson;

    let alertMessage = `Added ${currentPerson.firstName} ${currentPerson.lastName}
            \n So far we have booked the following people:\n`;
    for (let idCode of Object.keys(peopleInBooking.value)) {
      alertMessage += `${peopleInBooking.value[idCode].firstName} ${peopleInBooking.value[idCode].lastName}\n`;
    }
    alert(alertMessage);
  }

  return {
    responseData,
    peopleInBooking,
    phoneNumber,
    firstName,
    lastName,
    dateOfBirth,
    country,
    phoneNumber,
    inputDisabled,
    addPersonToBooking,
    getPersonDataFromDB,
    addPersonDataToDB,
  };
});
