import { glassStyleL1 } from "./commonStyles";

type BrandLogoProps = { text: string };
const BrandLogo = ({ text }: BrandLogoProps) => {
  return (
    <div
      id="brand-logo"
      className={
        "flex items-center justify-center text-center p-2 m-4 mb-2 rounded-2xl" +
        glassStyleL1
      }
    >
      <div className="text-4xl font-bold text-gray-100 ml-[1.5rem] tracking-[1.5rem] text-center uppercase">
        {text}
      </div>
    </div>
  );
};

export default BrandLogo;
