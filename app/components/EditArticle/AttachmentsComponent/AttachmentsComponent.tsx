// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesExpand } from '@/types/expanded-types';
import { ArticlesResponse } from '@/types/pocketbase-types';
import Grid from '@mui/material/Unstable_Grid2';
import { FunctionComponent, useEffect, useState } from 'react';
import AttachmentCard from './AttachmentCard';
import { getAttachmentFilesURL } from '@/lib/apiHelpers/attachmentsAPI';
import { countSubstrings } from '@/lib/helper';
import Typography from '@mui/material/Typography';

interface AttachmentsComponentProps {
	myArticle: ArticlesResponse<ArticlesExpand>;
	myArticleDocument: string;
}

const AttachmentsComponent: FunctionComponent<AttachmentsComponentProps> = ({
	myArticle,
	myArticleDocument,
}) => {
	const [attachmentURLS, setAttachmentURLS] = useState<string[]>([]);

	const [forceUpdate, setForceUpdate] = useState<boolean>(false);

	const [lastAttachmentsCount, setLastAttachmentsCount] = useState<
		number | undefined
	>(0);

	useEffect(() => {
		if (lastAttachmentsCount !== undefined) {
			getAttachmentFilesURL(myArticle.id, true).then((attachmentURLS) => {
				setAttachmentURLS(attachmentURLS);
			});
		}
	}, [forceUpdate, lastAttachmentsCount]);

	useEffect(() => {
		const count = countSubstrings(myArticleDocument, 'http');
		setLastAttachmentsCount(count);
	}, [myArticleDocument]);

	if (attachmentURLS.length === 0)
		return <Typography>Nada aqui ainda...</Typography>;

	return (
		<Grid
			container
			spacing={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
			sx={{
				justifyContent: 'space-between',
			}}
			p={1}
		>
			{attachmentURLS.map((attachmentURL) => (
				<Grid
					key={`attachments_${attachmentURL}`}
					xs={4}
					sm={3}
					md={2}
					lg={1.6}
					xl={1.5}
				>
					<AttachmentCard
						numberOfOccurrences={countSubstrings(
							myArticleDocument,
							attachmentURL
						)}
						setForceUpdate={setForceUpdate}
						imageUrl={attachmentURL}
						articleId={myArticle.id}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default AttachmentsComponent;
