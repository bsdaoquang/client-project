/** @format */

import { Button, Card, Form, Input, message } from 'antd';
import { Lock, Sms } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import authenticationAPI from '../api/authAPI';
import { appConfig } from '@/constants/appConfig';
import { useDispatch } from 'react-redux';
import { addAuth } from '@/redux/reducers/authRecucer';
import { useRouter } from 'next/router';

function LoginPage() {
	const formRef = useRef();
	const router = useRouter();

	const dispatch = useDispatch();

	const handleLogin = async (values) => {
		const api = '/login';

		try {
			const res = await authenticationAPI.HandleAuthenticationAPI(
				api,
				values,
				'post'
			);

			if (res) {
				message.success(`Welcome back ${res.email}`);

				dispatch(addAuth(res));

				localStorage.setItem(
					appConfig.localDataNames.accessToken,
					res.accesstoken
				);

				router.push('/');
			}
		} catch (error) {
			console.log(error);
			message.error(error);
		}
	};

	return (
		<div className='col col-lg-8 offset-lg-2 pt-4'>
			<Card>
				<h1>Login</h1>
				<Form
					ref={formRef}
					onFinish={handleLogin}
					layout='vertical'
					size='large'>
					<Form.Item
						name={'email'}
						label='Email'
						rules={[
							{
								required: true,
								message: 'Please enter your email',
							},
						]}>
						<Input
							placeholder='Email'
							type='email-address'
							maxLength={50}
							prefix={<Sms size={20} color='#95a5a6' />}
						/>
					</Form.Item>
					<Form.Item
						name={'password'}
						label='Password'
						rules={[
							{
								required: true,
								message: 'Please enter your email',
							},
						]}>
						<Input.Password
							placeholder='Password'
							prefix={<Lock size={20} color='#95a5a6' />}
							maxLength={20}
						/>
					</Form.Item>
				</Form>

				<Button
					className='mt-4'
					style={{ width: '100%' }}
					onClick={() => formRef.current.submit()}
					type='primary'
					size='large'>
					Login
				</Button>
			</Card>
		</div>
	);
}

export default LoginPage;
