import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import SearchInput from "../SearchInput";
import { Filters, InputTypes, requestStatus } from "../../utils/Constants";
import { useSpares } from "../../hooks/sparesHooks";
import {
  useCompleteRequest,
  useSendReport,
  useSpecialization,
  useUpdateRequest,
} from "../../hooks/technicianHooks";

export default function ReportModal({ request, onRequestClose }) {
  console.log(request);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [labelStatus, setLabelStatus] = useState(request.status);
  const [comment, setComment] = useState("");
  const isNewRequest = request.requestType == "NewRequest";
  const { data: spares, isLoading, error, isError } = useSpares();
  const { mutate: updateRequest } = useUpdateRequest();
  const { mutate: completeRequest } = useCompleteRequest();
  const { mutate: sendReport, isSuccess } = useSendReport();
  const [spareCounts, setSpareCounts] = useState([]);
  const {
    data: specialization,
    isHardwareSpecialization = specialization === "Hardware",
  } = useSpecialization();
  const [maintenanceTime, setMaintenanceTime] = useState(1);

  const handleTextChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      labelStatus == requestStatus.completed &&
      request.status != labelStatus
    ) {
      if (isNewRequest) {
        if (labelStatus == requestStatus.completed && comment.trim() === "") {
          alert("Please enter a comment before submitting.");
          return;
        }

        const additionalCost = formData.get("additionalCost");

        if (isHardwareSpecialization) {
          const totalPrice = spares
            .filter((spare) => spareCounts[spare.name]?.checked)
            .reduce((acc, spare) => {
              const quantity = spareCounts[spare.name].count;
              return acc + parseFloat(spare.price) * quantity;
            }, 0);

          completeRequest({
            RequestId: request.id,
            ActualCost: totalPrice + additionalCost,
          });

          setComment(
            comment +
              `\nSpares total cost: $${totalPrice}\nAdditional cost: $${additionalCost}`
          );

          const selectedSpares = spares
            .filter((spare) => spareCounts[spare.name]?.checked)
            .map((spare) => ({
              spareId: spare.id,
              quantity: spareCounts[spare.name].count,
            }));

          sendReport({ RequestId: request.id, Comment: comment, Spares: selectedSpares });
        } else {
          if (!additionalCost) {
            alert("Cost field is empty");
            return;
          }
          completeRequest({
            RequestId: request.id,
            ActualCost: additionalCost,
          });

          setComment(comment + `\nCost: $${additionalCost}`);
          sendReport({ RequestId: request.id, Comment: comment, Spares: [] });
        }
      } else {
        completeRequest({
          RequestId: request.id,
        });
      }
    }

    if (
      labelStatus == requestStatus.inProgress &&
      request.status == requestStatus.pending
    ) {
      if (isNewRequest) {
        const maintenanceTime = formData.get("maintenanceTime");
        if (!maintenanceTime) {
          alert("maintenanceTime field is empty");
          return;
        }
        updateRequest({
          MaintenanceTime: maintenanceTime,
          RequestId: request.id,
        });
      } else {
        updateRequest({ RequestId: request.id });
      }
    }

    onRequestClose();
  };

  useLayoutEffect(() => {
    if (spares) {
      setSpareCounts(
        spares.reduce((acc, spare) => {
          acc[spare.name] = { count: 0, checked: false };
          return acc;
        }, {})
      );
    }
  }, [spares]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-auto max-h-[80vh]">
        {request.status != requestStatus.completed && (
          <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <Dropdown />
            {labelStatus == requestStatus.inProgress &&
              request.status == requestStatus.pending &&
              isNewRequest && (
                <label
                  className="text-sm font-bold mt-5 block"
                  htmlFor="maintenanceTime"
                >
                  Maintenance Time:
                  <input
                    id="maintenanceTime"
                    type={InputTypes.NUMBER}
                    name="maintenanceTime"
                    step="1"
                    min="1"
                    placeholder="number of hours"
                    className="block p-2 border-2 rounded border-gray-400 focus:border-black"
                  />
                </label>
              )}
            {labelStatus == requestStatus.completed && isNewRequest && (
              <div>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 mt-6">
                      Submit your report:
                    </h3>
                    <textarea
                      rows="5"
                      className="mt-2 w-full resize-none max-h-fit border-gray-400 focus:border-black border-2 p-2 rounded-md"
                      placeholder="Write your notes"
                      onChange={handleTextChange}
                    />
                    {isNewRequest && (
                      <label
                        htmlFor="additionalCost"
                        className="block mt-3 text-sm font-bold"
                      >
                        {isHardwareSpecialization && "Additional"} Cost:
                        <input
                          id="additionalCost"
                          type={InputTypes.NUMBER}
                          name="additionalCost"
                          step="0.01"
                          min="1"
                          placeholder="10.00"
                          className="block w-32 p-2 border-2 rounded border-gray-400 focus:border-black"
                        />
                      </label>
                    )}
                  </div>

                  {isHardwareSpecialization && (
                    <div className="flex-1">
                      <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholder="Search spares..."
                      />
                      <Spares />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
                Submit
              </button>
              <CloseButton />
            </div>
          </form>
        )}
      </div>
    </div>
  );

  function CloseButton() {
    return (
      <button
        type="button"
        className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800"
        onClick={onRequestClose}
      >
        Close
      </button>
    );
  }

  function Spares() {
    const [filteredSpares, setFilteredSpares] = useState([]);

    const toggleChecked = (spareName) => {
      setSpareCounts((prevCounts) => ({
        ...prevCounts,
        [spareName]: {
          count: prevCounts[spareName]?.checked
            ? 0
            : Math.max(1, prevCounts[spareName]?.count || 1),
          checked: !prevCounts[spareName]?.checked,
        },
      }));
    };

    const handleIncrease = (spareName) => {
      if (spareCounts[spareName]?.checked) {
        setSpareCounts((prevCounts) => ({
          ...prevCounts,
          [spareName]: {
            ...prevCounts[spareName],
            count: (prevCounts[spareName].count || 0) + 1,
          },
        }));
      } else {
        alert(
          `You can't increase the amount of ${spareName} if the spare part is not selected`
        );
      }
    };

    const handleDecrease = (spare) => {
      if (spareCounts[spare]?.checked) {
        setSpareCounts((prevCounts) => ({
          ...prevCounts,
          [spare]: {
            ...prevCounts[spare],
            count: Math.max(0, (prevCounts[spare]?.count || 1) - 1),
          },
        }));
      } else {
        alert(`You can't decrease the amount of ${spare} if the spare part is not selected`);
      }
    };

    useEffect(() => {
      setFilteredSpares(
        spares?.filter((spare) =>
          spare.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
      );
    }, [searchTerm, spares]);

    return (
      <div>
        {filteredSpares.length > 0 && (
          <div className="mt-3">
            {filteredSpares.map((spare) => (
              <div key={spare.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={spareCounts[spare.name]?.checked || false}
                  onChange={() => toggleChecked(spare.name)}
                  className="mr-2"
                />
                <span className="flex-1">{spare.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleIncrease(spare.name)}
                    className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                  <span>{spareCounts[spare.name]?.count || 0}</span>
                  <button
                    type="button"
                    onClick={() => handleDecrease(spare.name)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function Dropdown() {
    return (
      <div className="relative mt-3">
        <select
          value={labelStatus}
          onChange={(e) => setLabelStatus(e.target.value)}
          className="block w-full p-2 border-2 rounded border-gray-400 focus:border-black"
        >
          <option value={requestStatus.pending}>Pending</option>
          <option value={requestStatus.inProgress}>In Progress</option>
          <option value={requestStatus.completed}>Completed</option>
        </select>
      </div>
    );
  }
}
