import { Shell } from "@/components/Shell";
import { getUserAction } from "@/app/actions/user";
import { ERoute } from "@/types/route";
import { redirectEncoded } from "@/utils/redirectEncoded";
import { getHistoryAction } from "@/app/actions/ideas";
import { formatHistoryItem } from "@/utils/formatHistoryItem";
import { HistoryList } from "@/components/HistoryList";

const History = async () => {
  const { data, error } = await getUserAction();
  const { data: history, error: historyError } = await getHistoryAction();

  if (!data && error) {
    return redirectEncoded(ERoute.HOME, "error", error.message);
  }

  const historyList = history?.map((item) => formatHistoryItem(item)) || [];

  return (
    <Shell>
      <HistoryList list={historyList} />
    </Shell>
  );
};

export default History;
