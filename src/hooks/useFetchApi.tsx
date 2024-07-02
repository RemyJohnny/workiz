const api_token = "api_token=26e600db58a7736c9baacd96f3ef93db6202d95e";

export interface deal {
  //client details
  first_name: string;
  last_name: string;
  phone: number | string;
  email?: string;

  // job details
  job_type: string;
  job_source: string;
  job_description: string;

  //service location
  address: string;
  city: string;
  state: string;
  zip_code: number | string;
  area: number | string;

  //scheduled
  start_date: string;
  start_time: string;
  end_time: string;
  test: string;
}

export default function useFetchApi() {
  const getRequest = async (url: string) => {
    let error;
    const json_res = await fetch(`${url}?${api_token}`);
    const response = await json_res.json();
    if (json_res.ok) {
      error = null;
      console.log("fetched data", response);
    } else {
      error = response;
      console.error(response);
    }
    return { response, error };
  };
  //adds deal or dealsField
  const postRequest = async (url: string, payload: object) => {
    let error: object | null = null;
    const json_res = await fetch(`${url}?${api_token}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await json_res.json();
    if (json_res.ok) {
      error = null;
      console.log("added successfully", response);
    } else {
      error = response;
      console.error(response);
    }
    return { error, response };
  };

  return { postRequest, getRequest };
}
