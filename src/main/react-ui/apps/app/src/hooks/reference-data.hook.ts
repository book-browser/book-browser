import { useSelector } from "react-redux";
import { RootState } from "slices/store";

export const useReferenceData = () => {
  return useSelector((state: RootState) => state.referenceDataReducer);
}
