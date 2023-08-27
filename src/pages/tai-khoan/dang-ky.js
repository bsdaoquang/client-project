/** @format */

import { Card, Form, Input } from 'antd';
import { Sms } from 'iconsax-react';
import React, { useRef } from 'react';

function RegisterPage() {
	const formRef = useRef();

	const handleRegister = async (values) => {
		console.log(values);
	};
	return (
		<div>
			<div className='col col-lg-6 offset-lg-3'>
				<Card>
					<h1>Login</h1>
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
							]}></Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
}

export default RegisterPage;
