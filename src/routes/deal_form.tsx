import { useEffect, useState } from "react";
import useFetchApi, { deal } from "../hooks/useFetchApi";
import CreateDeal from "../hooks/useCreateDeal";
import { inputField } from "../hooks/useCreateDeal";
import useSDK from "../hooks/useSdk";
import { Command, View } from "@pipedrive/app-extensions-sdk";

export default function AddDeal() {
  const { getRequest } = useFetchApi();
  const { getKeys, addAllField, createDeal } = CreateDeal();
  const sdk = useSDK();

  const [deal, setDeal] = useState<deal>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    job_type: "",
    job_source: "",
    job_description: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    area: "",
    start_date: "",
    start_time: "",
    end_time: "",
    test: "",
  });

  useEffect(() => {
    const setUpDealField = async () => {
      const dealField = await getRequest(
        "https://remywapio-sandbox.pipedrive.com/api/v1/dealFields"
      );
      if (!dealField.error) {
        getKeys(inputField, dealField.response.data);
        await addAllField(inputField);
      }
    };
    setUpDealField();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  const handleSummit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = createDeal(inputField, deal);
    await sdk.execute(Command.REDIRECT_TO, { view: View.DEALS, id: id });
  };
  return (
    <>
      <form onSubmit={handleSummit} className=" bg-slate-50">
        <div className=" bg-slate-100 grid grid-cols-2">
          <div className="p-4 shadow m-4 bg-white rounded-lg">
            <h2 className=" text-2xl font-semibold">Client Details</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    value={deal.first_name}
                    onChange={handleChange}
                    autoComplete="given-name"
                    placeholder="First name"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    value={deal.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    autoComplete="family-name"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    name="phone"
                    value={deal.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Phone"
                    required={true}
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    name="email"
                    value={deal.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email (optional)"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 shadow m-4 bg-white rounded-lg">
            <h2 className=" text-2xl font-semibold">Job Details</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="job_type"
                    value={deal.job_type}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 bg-white rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">Job type</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="job_source"
                    value={deal.job_source}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">Job source</option>
                    <option value="Glassdoor">Glassdoor</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <textarea
                    name="job_description"
                    value={deal.job_description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Job description (optional)"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 shadow m-4 bg-white rounded-lg">
            <h2 className=" text-2xl font-semibold">Service location</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    value={deal.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    value={deal.city}
                    onChange={handleChange}
                    placeholder="City"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    name="state"
                    value={deal.state}
                    onChange={handleChange}
                    type="text"
                    placeholder="State"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    name="zip_code"
                    value={deal.zip_code}
                    onChange={handleChange}
                    type="number"
                    placeholder="Zip code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="area"
                    value={deal.area}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">Area</option>
                    <option value="all">all</option>
                    <option value="none">none</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 shadow m-4 bg-white rounded-lg">
            <h2 className=" text-2xl font-semibold">Scheduled</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:col-span-6">
                <div className="mt-2">
                  <input
                    type="date"
                    name="start_date"
                    value={deal.start_date}
                    onChange={handleChange}
                    placeholder="Start date"
                    required={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="start_time"
                    value={deal.start_time}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">Start time</option>
                    <option value="8:00">8:00</option>
                    <option value="12:00">12:00</option>
                    <option value="20:00">20:00</option>
                    <option value="00:00">00:00</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="end_time"
                    value={deal.end_time}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">End time</option>
                    <option value="8:00">8:00</option>
                    <option value="12:00">12:00</option>
                    <option value="20:00">20:00</option>
                    <option value="00:00">00:00</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <select
                    name="test"
                    value={deal.test}
                    onChange={handleChange}
                    required={true}
                    className="block w-full py-3 rounded-md border-0 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <option value="">Test select</option>
                    <option value="oral test">Oral test</option>
                    <option value="technical test">Technical test</option>
                    <option value="soft skill test">Soft skill test</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-4">
          <button
            type="submit"
            className="relative disabled:bg-slate-500 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 ">
            <span className="relative text-xl font-semibold px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Create Job
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
