import { useLocation } from "react-router-dom";
import ServiceByID from "../ServiceByID";
import { useFeedbacksOnService, useUser } from "../../hooks/feedbacksHooks";
import CustomTable from "../../components/CustomTable";
import Loading from "../../components/Loading";


const headers = ["User", "Comment", "Rating"];

const FeedbackRow = (feedback) => {
  const { data, isLoading, error } = useUser(feedback.customerid);
  const user = data && data.length > 0 ? data[0] : null;
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <td className="p-4">
        {!user && <h1 className="mx-auto">No user data available</h1>}
        {user && (
          <div className="flex flex-col bg-sky-600 rounded-[10px] p-4 text-white w-fit mx-auto">
            <div className="text-2xl">{user.name}</div>
            <div className="text-sm">{user.email}</div>
          </div>
        )}
      </td>
      <td className="p-4">
        <div>{feedback.comment}</div>
      </td>
      <td className="p-4">
        <div className="text-center">
          <span className="text-xl">{feedback.rating}</span>
        </div>
      </td>
    </>
  );
};

const ServiceInAdmin = () => {
  const location = useLocation();
  const service = location.state?.readMore;
  const { data: feedbacks, isLoading } = useFeedbacksOnService(service.id);

  if (isLoading) {
    console.log(service.id);
    return <Loading />;
  }

  return (
    <>
      <ServiceByID />
      <div className="mx-14 mb-8">
        <CustomTable
          headers={headers}
          data={feedbacks}
          renderRow={FeedbackRow}
          isWhite={false}
        />
      </div>
    </>
  );
};

export default ServiceInAdmin;
