/** @format */

import { appConfig } from '@/constants/appConfig';
import authenticationAPI from '@/pages/api/authAPI';
import { addAuth } from '@/redux/reducers/authRecucer';
import {
	Avatar,
	Button,
	Dropdown,
	Modal,
	Space,
	Spin,
	Tooltip,
	message,
} from 'antd';
import { Logout } from 'iconsax-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HeaderComponent() {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const user = useSelector((state) => state.auth.authData);
	const dispatch = useDispatch();

	useEffect(() => {
		getUserProfile();
	}, []);

	const getUserProfile = async () => {
		setIsLoading(true);

		const api = '/me';
		const accesstoken = localStorage.getItem(
			appConfig.localDataNames.accessToken
		);

		if (accesstoken) {
			try {
				await authenticationAPI.HandleAuthenticationAPI(api).then((res) => {
					const userData = {
						email: res.user.email,
						accesstoken,
						uid: res.user.uid,
					};

					dispatch(addAuth(userData));
				});

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.log(error);
				message.error(error);
			}
		}
	};

	const handleLogout = () => {
		Modal.confirm({
			title: 'Logout',
			content: 'Are you sure you want to logout?',
			onOk: () => {
				dispatch(addAuth({}));
				localStorage.removeItem(appConfig.localDataNames.accessToken);
			},
		});
	};

	return (
		<div className='header'>
			<div className='container '>
				<div className='row'>
					<div className='col menu-header'>Menu</div>
					<div style={{ padding: '10px 20px' }}>
						{isLoading ? (
							<Spin />
						) : user.uid && user.accesstoken ? (
							<Space>
								<Avatar size={32}>
									{user.email.substring(0, 1).toUpperCase()}
								</Avatar>
								<Tooltip title='Logout'>
									<Button
										type='text'
										icon={<Logout size={20} color='red' />}
										onClick={handleLogout}
									/>
								</Tooltip>
							</Space>
						) : (
							<Space>
								<Button
									type='link'
									onClick={() => router.push('/tai-khoan/dang-nhap')}>
									Login
								</Button>
								<Button
									type='link'
									onClick={() => router.push('/tai-khoan/dang-ky')}>
									Register
								</Button>
							</Space>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderComponent;
