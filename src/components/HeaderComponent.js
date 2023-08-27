/** @format */

import { Avatar, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function HeaderComponent() {
	const [isLogin, setIsLogin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const res = localStorage.getItem('accessToken');

		if (res) {
			setIsLogin(true);
		}
	}, []);

	return (
		<div className='header'>
			<div className='container '>
				<div className='row'>
					<div className='col menu-header'>Menu</div>
					<div style={{ padding: '10px 20px' }}>
						{isLogin ? (
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
