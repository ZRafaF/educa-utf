import { FunctionComponent } from 'react';

interface RadialSelectorProps {
	multiple?: boolean;
	options: string[];
	answare: string;
}

const RadialSelector: FunctionComponent<RadialSelectorProps> = ({
	multiple,
	options,
	answare,
}) => {
	return <>{options}</>;
};

export default RadialSelector;
