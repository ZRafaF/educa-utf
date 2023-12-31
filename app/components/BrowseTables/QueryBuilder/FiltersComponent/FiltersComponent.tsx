import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import FilterTagPicker from './FilterTagPicker';
import { TagsResponse } from '@/types/pocketbase-types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

interface FiltersComponentProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const FiltersComponent: React.FunctionComponent<FiltersComponentProps> = ({
	setIsLoading,
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();
	const filter = searchParams.get('filter') ?? '';

	const selectedTagsIds = useMemo(() => {
		// Split the filters by || then get the string in between '
		return filter.split('||').map((tag) => {
			return tag.split("'")[1];
		});
	}, [filter]);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<TagsResponse[]>([]);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			params.set(name, `${value}`);

			return decodeURIComponent(params.toString());
		},
		[searchParams, filter]
	);

	const handleChangeFilters = () => {
		const tagFilterString: string = selectedTags
			.map((tag) => {
				return `tag='${tag.id}'`;
			})
			.join('||');

		setIsLoading(true);
		router.push(
			pathname + '?' + createQueryString('filter', `${tagFilterString}`)
		);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	// Detects when the router changes and updates the loading state

	useEffect(() => {
		setIsLoading(false);
	}, [searchParams]);

	return (
		<>
			<Stack
				direction="row"
				spacing={1}
				justifyContent="flex-start"
				alignItems="center"
			>
				<Typography>Filtros:</Typography>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Ordenar por"
					variant="standard"
					onOpen={() => {
						setIsOpen(true);
					}}
					defaultValue={'0'}
					open={isOpen}
				>
					<Box
						p={1}
						minWidth={300}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					>
						<Backdrop
							open={isOpen}
							onClick={() => {
								setIsOpen(false);
							}}
							invisible
						/>
						<FilterTagPicker
							setSelectedTags={setSelectedTags}
							defaultTagsIds={selectedTagsIds}
						/>
						<Button
							onClick={() => {
								setIsOpen(false);
								handleChangeFilters();
							}}
						>
							Enviar
						</Button>
					</Box>
				</Select>
			</Stack>
		</>
	);
};

export default FiltersComponent;
