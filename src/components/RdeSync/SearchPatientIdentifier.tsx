import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import storage from "../../app/localStorage";
import { FaPlus } from "react-icons/fa";
import Header from "../layout/Header";
const SearchPatientIdentifier = () => {
  const [patientIdentifier, setPatientIdentifier] = useState({
    identifier: "",
  });
  const { identifier } = patientIdentifier;
  const onChange = (e: { target: { name: any; value: any } }) => {
    setPatientIdentifier({
      ...patientIdentifier,
      [e.target.name]: e.target.value,
    });
  };
  const [identifierList, setIdentifierList] = useState<string[]>([]);

  const tabulateIdentifier = () => {
    const identifierInput = document.getElementById(
      "identifier"
    ) as HTMLInputElement;
    if (identifierInput.value.length > 0) {
      //remove duplicates
      const formatIdentifiers = new Set(identifier.split(","));
      const newIdentifiers = Array.from(formatIdentifiers).filter(
        (id) => !identifierList.includes(id)
      );
      setIdentifierList([...identifierList, ...newIdentifiers]);
      if (identifierInput) {
        identifierInput.value = "";
      }
    } else {
      return;
    }
  };
  const currentDate = new Date();
  //month options
  const monthOptions = [];
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.getFullYear(), i).toLocaleString(
      "default",
      { month: "long" }
    );
    monthOptions.push(
      <option key={i} value={i + 1}>
        {month}
      </option>
    );
  }
  // year options
  const yearOptions = [];
  const baseYear = 2020;
  const currentYear = currentDate.getFullYear();
  for (let i = baseYear; i <= currentYear; i++) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const deleteIdentifier = (id: any) => {
    setIdentifierList(identifierList.filter((existing) => existing !== id));
  };

  const handleSubmit = () => {
    const selectedMonth = (
      document.querySelector(".month-dropdown") as HTMLSelectElement
    ).value;
    const selectedYear = (
      document.querySelector(".year-dropdown") as HTMLSelectElement
    ).value;
    const lastDayOfMonth = new Date(
      parseInt(selectedYear),
      parseInt(selectedMonth),
      0
    ).getDate();
    //convert date to yyyy/mm/dd
    const reporting_month = new Date(
      `${selectedYear}-${selectedMonth}-${lastDayOfMonth}`
    )
      .toISOString()
      .split("T")[0];
    const { user } = storage.loadData();
    const user_id = user.uuid;
    const requestBody = JSON.stringify({
      identifierList,
      reporting_month,
      user_id,
    });
    console.log(requestBody);
  };
  return (
    <div>
      <Header shouldRenderSearchLink={false} />
      <div className="grid gap-x-4 grid-cols-1 lg:grid-cols-2 justify-center w-11/12 mx-auto ">
        <div className="pl-10 md:px-32 lg:pl-10 xl:pl-24 2xl:pl-60 mt-10 shadow-lg pb-4">
          <div className="flex space-x-4 pt-2">
            <h2 className="text-xl pt-1.5">Reporting Month:</h2>
            <div className="bg-gray-200 inline-block w-auto">
              <select className="mt-3 mb-3 ml-3 mr-3 month-dropdown">
                {monthOptions}
              </select>
              <select className="mt-3 mb-3 ml-3 mr-3 year-dropdown">
                {yearOptions}
              </select>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl">Add identifier(s):</h2>
            <div className="mt-2">
              <textarea
                id="identifier"
                name="identifier"
                onChange={onChange}
                placeholder="Add indentifier(s) here..."
                className="p-2.5 w-96 h-48 bg-gray-50 rounded-lg border border-gray-300"
              ></textarea>
            </div>
            <div className="mt-10 ml-72">
              <button
                onClick={tabulateIdentifier}
                className="bg-blue-500 text-white hover:bg-blue-600 hover:font-bold py-2 px-5 rounded-lg flex justify-around items-center "
              >
                <FaPlus className="ml-1" /> Add
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 shadow-lg mr-60 w-full">
          <div className="pt-2">
            <table className="w-11/12 mx-10 lg:mx-auto">
              <thead className="uppercase bg-gray-200">
                <tr className="w-full">
                  <th className="px-4 py-2 text-black">Count</th>
                  <th className="px-4 py-2 text-black">Identifier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {identifierList.map((id, index) => (
                  <tr key={index} className="bg-gray-100 hover:bg-gray-300 ">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{id}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteIdentifier(id)}
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid justify-items-end mr-9 mt-5">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white hover:bg-blue-600 hover:font-bold py-2 px-5 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPatientIdentifier;
