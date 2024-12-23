import { Form } from "@/components/Form";
import { Shell } from "@/components/Shell";
import { getUserAction } from "@/app/actions/user";
import { ERoute } from "@/types/route";
import { redirectEncoded } from "@/utils/redirectEncoded";

const Dashboard = async () => {
  const { data, error } = await getUserAction();
  
  if (!data && error) {
    return redirectEncoded(ERoute.HOME, "error", error.message);; 
  }

  return (
    <Shell>
      <Form />
    </Shell>
  );
};

export default Dashboard;
