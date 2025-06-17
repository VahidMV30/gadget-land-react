import { useQuery } from "@tanstack/react-query";
import { SettingsResponse } from "../../../../types/settingTypes";
import { fetchSettingsApi } from "../../../../api/settingsApi";

const useFetchSettingsQuery = () => {
  const fetchSettings = useQuery<SettingsResponse>({
    queryKey: ["fetchSettings"],
    queryFn: fetchSettingsApi,
  });

  return fetchSettings;
};

export default useFetchSettingsQuery;
