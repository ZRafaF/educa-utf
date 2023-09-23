// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UsersResponse } from '@/types/pocketbase-types';
import useGetUserAvatar from '@/hooks/useGetUserAvatar';
import AvatarComponent from '@/components/AvatarComponent/AvatarComponent';

interface ProfileAvatarProps {
	user: UsersResponse | null;
}

const ProfileAvatar: FunctionComponent<ProfileAvatarProps> = ({ user }) => {
	const [avatarUrl] = useGetUserAvatar(user);

	return (
		<>
			{user ? (
				<AvatarComponent
					name={user.name}
					src={avatarUrl}
					size="small"
				/>
			) : (
				<AccountCircle />
			)}
		</>
	);
};

export default ProfileAvatar;
