/** @format */

import { Avatar, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function HeaderComponent() {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const user = useSelector((state) => state.auth.authData);

	return (
		<div className='header'>
			<div className='container '>
				<div className='row'>
					<div className='col menu-header'>Menu</div>
					<div style={{ padding: '10px 20px' }}>
						{user.uid && user.accesstoken ? (
							<Space>
								<Avatar size={40} />
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
