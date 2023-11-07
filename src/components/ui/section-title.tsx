import { ComponentProps } from "react";

const SectionTitle = ({children, ...props}: ComponentProps<"p">) => {
  return <p className="mb-3 pl-5 font-bold uppercase lg:mb-4">{children}</p>;
};

export default SectionTitle;
