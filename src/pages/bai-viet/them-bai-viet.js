/** @format */

import { authSlice } from '@/redux/reducers/authRecucer';
import { Card, Input, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import postAPi from '../api/postAPI';
import { Router, useRouter } from 'next/router';

const date = new Date();

function AddNewPost() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const router = useRouter();

	const user = useSelector((state) => state.auth.authData);

	useEffect(() => {
		!user.uid && router.push('/');
	}, [user]);

	useEffect(() => {
		// setInterval(() => {
		// 	handleSaveDarft();
		// }, 5000);
	}, []);

	const handleSaveDarft = (isPublish) => {
		if (title || content) {
			const data = {
				title: title ?? '',
				content: content ?? '',
				createdAt: Date.now(),
				updatedAt: Date.now(),
				createdBy: user.uid,
				status: isPublish ? 'publish' : 'draft',
			};

			handlePublishPost(data);
		}
	};

	const handlePublishPost = async (data) => {
		const api = '/';

		try {
			await postAPi.HandlePost(api, data, 'post').then((res) => {
				router.push('/');
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='pt-4'>
			<div className='row'>
				<div className='col col-lg-8 '>
					<Card>
						<Input
							placeholder='Title'
							maxLength={150}
							showCount
							allowClear
							size='large'
							value={title}
							onChange={(val) => setTitle(val.target.value)}
						/>
						<Input.TextArea
							className='mt-4'
							placeholder='Content'
							maxLength={1500}
							showCount
							rows={10}
							allowClear
							value={content}
							onChange={(val) => setContent(val.target.value)}
						/>

						<Input placeholder='Tags' className='mt-4' size='large' />
					</Card>
				</div>
				<div className='col-lg-4'>
					<Card>
						<p>
							Date:{' '}
							{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
						</p>

						<p>Created by: {user.email}</p>

						<p>Status: Draft</p>

						<Space>
							<Button>Cancel</Button>
							<Button type='primary' onClick={() => handleSaveDarft(true)}>
								Publish
							</Button>
						</Space>
					</Card>

					<Card title='Thumbnail' className='mt-4'>
						<Button>Upload Thumbnail</Button>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default AddNewPost;
