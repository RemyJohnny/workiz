import useFetchApi, { deal } from "./useFetchApi";

interface dataType {
  name: string;
  key: string;
}
interface inputFieldType {
  name: string;
  key: string;
  field_type: string;
}
interface newDealType {
  [key: string]: string | number | undefined;
}

export default function useCreateDeal() {
  const { postRequest } = useFetchApi();
  function isAvail(el: string, data: dataType[]) {
    for (let j = 0; j < data.length; j++) {
      if (el === data[j].name) return data[j].key;
    }
    return null;
  }
  function getKeys(inputField: inputFieldType[], data: dataType[]) {
    for (let i = 0; i < inputField.length; i++) {
      const key = isAvail(inputField[i].name, data);
      if (key !== null) {
        inputField[i].key = key;
      }
    }
  }

  //console.log(inputField)

  async function addCustomField(name: string, fieldType: string) {
    const field = {
      name: name,
      field_type: fieldType,
    };
    // api call to add new deal field
    const { error, response } = await postRequest(
      "https://remywapio-sandbox.pipedrive.com/api/v1/dealFields",
      field
    );
    if (!error) {
      const key = response.data.key;
      //console.log("created custom field for", { name: field.name, key: key });
      //console.log("--------------------");
      return key;
    } else throw error;
  }

  const addAllField = async (inputField: inputFieldType[]) => {
    for (let i = 0; i < inputField.length; i++) {
      if (!inputField[i].key) {
        inputField[i].key = await addCustomField(
          inputField[i].name,
          inputField[i].field_type
        );
      }
    }
  };
  async function createDeal(inputField: inputFieldType[], dealData: deal) {
    const newDeal: newDealType = {
      title: "job deal",
      [inputField[0].key]: dealData.first_name,
      [inputField[1].key]: dealData.last_name,
      [inputField[2].key]: dealData.phone,
      [inputField[3].key]: dealData.email,
      [inputField[4].key]: dealData.job_type,
      [inputField[5].key]: dealData.job_source,
      [inputField[6].key]: dealData.job_description,
      [inputField[7].key]: dealData.address,
      [inputField[8].key]: dealData.city,
      [inputField[9].key]: dealData.state,
      [inputField[10].key]: dealData.zip_code,
      [inputField[11].key]: dealData.area,
      [inputField[12].key]: dealData.start_date,
      [inputField[13].key]: dealData.start_time,
      [inputField[14].key]: dealData.end_time,
      [inputField[15].key]: dealData.test,
    };
    const { error, response } = await postRequest(
      "https://remywapio-sandbox.pipedrive.com/api/v1/deals",
      newDeal
    );
    if (!error) {
      console.log("deal added successfully", { response });
      return response.data.id;
    } else {
      console.error(error);
      return null;
    }
  }

  return { addAllField, getKeys, createDeal };
}

export const inputField: inputFieldType[] = [
  { name: "first name", field_type: "varchar", key: "" },
  { name: "Last name", field_type: "varchar", key: "" },
  { name: "Phone", field_type: "phone", key: "" },
  { name: "Email", field_type: "varchar", key: "" },
  { name: "Job type", field_type: "varchar", key: "" },
  { name: "Job source", field_type: "varchar", key: "" },
  { name: "Job description", field_type: "text", key: "" },
  { name: "Address", field_type: "address", key: "" },
  { name: "City", field_type: "address", key: "" },
  { name: "State", field_type: "address", key: "" },
  { name: "Zip code", field_type: "address", key: "" },
  { name: "Area", field_type: "address", key: "" },
  { name: "Start date", field_type: "date", key: "" },
  { name: "Start time", field_type: "time", key: "" },
  { name: "End time", field_type: "time", key: "" },
  { name: "Test select", field_type: "text", key: "" },
];
