import BrandLogo from "../atoms/BrandLogo";
import { glassStyleL1 } from "../atoms/commonStyles";
import RecipeList from "../molecules/RecipeList";

const LeftPanel = () => {
  return (
    <>
      <BrandLogo text="Fordo" />

      <div
        className={
          "w-ful h-full flex flex-col p-2 m-4 mt-2 overflow-auto rounded-2xl" +
          glassStyleL1
        }
      >
        <RecipeList />
      </div>
    </>
  );
};

export default LeftPanel;
