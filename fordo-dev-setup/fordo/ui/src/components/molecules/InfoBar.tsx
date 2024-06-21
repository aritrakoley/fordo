import { clockOutlineIcon, peopleIcon, potIcon } from "../atoms/Icons";
import {
  glassStyleL2Dark,
  glassStyleL3,
  glassStyleL3Dark,
} from "../atoms/commonStyles";

type InfoBarPropType = {
  prep_time?: number | null;
  cook_time?: number | null;
  serving_size?: number | null;
};
const InfoBar = ({ prep_time, cook_time, serving_size }: InfoBarPropType) => {
  return (
    <div className={"text-gray-100 flex flex-col gap-1 rounded-full px-4 py-2"}>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        {clockOutlineIcon}
        {prep_time ? (prep_time / 60).toFixed(0) : 0}
      </div>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        <span className="w-6 h-6">{potIcon}</span>
        {cook_time ? (cook_time / 60).toFixed(0) : 0}
      </div>
      <div
        className={
          "w-fit flex items-center justify-start gap-2 text-2xl rounded-e-full pl-1 pr-4 py-1" +
          glassStyleL2Dark
        }
      >
        {peopleIcon}
        {serving_size ? (serving_size / 60).toFixed(0) : 0}
      </div>
    </div>
  );
};

export default InfoBar;
