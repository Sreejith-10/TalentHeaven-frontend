import {ReactNode} from "react";

const SectionWrapper = ({children}: {children: ReactNode}) => {
	return <div className="mx-[10%] xl:mx-[5%] flex">{children}</div>;
};

export default SectionWrapper;
