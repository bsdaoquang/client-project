/** @format */

import { Validation } from '@/utils/Validation';
import { Button, Card, Form, Input, message } from 'antd';
import { Sms } from 'iconsax-react';
import Link from 'next/link';
import React, { useRef } from 'react';
import authenticationAPI from '../api/authAPI';
import { useRouter } from 'next/router';
import { appConfig } from '@/constants/appConfig';
import { useDispatch } from 'react-redux';
import authRecucer, { addAuth } from '@/redux/reducers/authRecucer';

function RegisterPage() {
	const formRef = useRef();
	const router = useRouter();

	const handleRegister = async (values) => {
		const isEmail = Validation.email(values.email);

		const dispatch = useDispatch();

		if (isEmail) {
			const isValiPass = Validation.password(values.password);

			if (isValiPass) {
				if (values.password === values.confirm) {
					try {
						const res = await authenticationAPI.HandleAuthenticationAPI(
							'/register',
							{
								email: values.email,
								password: values.password,
							},
							'post'
						);

						if (res && res.data) {
							message.success('Đăng ký thành công');

							dispatch(addAuth(res));

							localStorage.setItem(
								appConfig.localDataNames.accessToken,
								res.data.accesstoken
							);
							router.push('/');
						} else {
							message.error(`can not register`);
						}
					} catch (error) {
						console.error(error);
					}
				} else {
					message.error('Password not match');
				}
			} else {
				message.error('Password is not correct');
			}
		} else {
			message.error('Email is not correct');
		}
	};
	return (
		<div>
			<div className='col col-lg-6 offset-lg-3'>
				<Card>
					<h1>Đăng ký</h1>
					<Form
						ref={formRef}
						layout='vertical'
						size='large'
						onFinish={handleRegister}>
						<Form.Item
							name={'email'}
							label='Email'
							rules={[
								{
									required: true,
									message: 'Please enter you email!',
								},
							]}>
							<Input
								placeholder='email'
								type='email-address'
								max={20}
								showCount
								allowClear
								prefix={<Sms size={20} color='#676767' />}
							/>
						</Form.Item>
						<Form.Item
							name='password'
							label='Password'
							rules={[
								{
									required: true,
									message: 'Please enter your password',
								},
							]}>
							<Input.Password placeholder='Password' />
						</Form.Item>
						<Form.Item
							name='confirm'
							label='Comfirm'
							rules={[
								{
									required: true,
									message: 'Please enter your password',
								},
							]}>
							<Input.Password placeholder='Confirm password' />
						</Form.Item>
					</Form>

					<Button
						type='primary'
						size='large'
						onClick={() => formRef.current.submit()}
						className='w-100'>
						Đăng ký
					</Button>

					<div className='mt-4 text-center'>
						<span>Bạn đã có tài khoản </span>
						<Link href={'/tai-khoan/dang-nhap'}>Đăng nhập</Link>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default RegisterPage;
