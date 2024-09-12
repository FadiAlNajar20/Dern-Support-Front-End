import { useCreateTechnicianAccount } from "../../hooks/adminDashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

export default function CreateTechnicianAccount() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const { mutate: createAccount, isLoading, isError, isSuccess, error } = useCreateTechnicianAccount();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Can not render this page",
      text: "Please refresh your page.",
    });
    return;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Name || !Email || !Password || !specialization || !PhoneNumber) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all the fields.",
      });
      return;
    }

    const accountData = {
      Name,
      Email,
      Password,
      specialization,
      PhoneNumber
    };

    try {
      await createAccount(accountData);
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Technician account for ${Name} has been created successfully.`,
      });
      navigate("/technicians/createAccount");

    } catch (err) {
      if (isError) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Failed to create the technician account. Please try again.`,
        });
        return;
      }
    }
  };
  return (
    <>
      <div className="flex">
        <section className="mx-auto">
          <div className="flex flex-col items-center justify-center px-1 py-1 mx-auto lg:py-0">
            <div className="flex items-center justify-center mb-12">
              <div className="relative inline-block">
                <span className="text-2xl md:text-4xl font-bold">
                  Create An Account For Technician
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
              </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow sm:max-w-lg xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-6 w-full max-w-lg mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="Name"
                      className="block mb-2 font-medium dark:text-blck text-2xl"
                    >
                      Name For Technician
                    </label>
                    <input
                      type="text"
                      name="Name"
                      id="Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                       focus:border-primary-600 block w-full p-2.5 
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Technician Name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Email"
                      className="block mb-2 font-medium dark:text-blck text-2xl"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                       focus:border-primary-600 block w-full p-2.5
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="PhoneNumber"
                      className="block mb-2 font-medium dark:text-blck text-2xl"
                    >
                      PhoneNumber
                    </label>
                    <input
                      type="text"
                      name="PhoneNumber"
                      id="PhoneNumber"
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600
                       focus:border-primary-600 block w-full p-2.5
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="07xxxxxxxx"
                      value={PhoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Password"
                      className="block mb-2 font-medium dark:text-blck text-2xl"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="Password"
                      id="Password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                       focus:border-primary-600 block w-full p-2.5
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Specialization"
                      className="block mb-2 font-medium dark:text-blck text-2xl"
                    >
                      Technician Type
                    </label>
                    <select
                      name="Specialization"
                      id="Specialization"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                       focus:border-primary-600 block w-full p-2.5 
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    >
                      <option value="">Select Technician Type</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full focus:bg-indigo-700 focus:outline-none bg-indigo-700
                     focus:bg-indigo-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
