/** @format */

import { Button, Card, Input, List } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { appConfig } from '@/constants/appConfig';
import Head from 'next/head';
import Link from 'next/link';
import { replaceName } from '@/utils/replaceName';

function HomeScreen({ dataPosts }) {
	const [posts, setPosts] = useState([]);
	const [searchKey, setSearchKey] = useState('');
	const [results, setResults] = useState([]);

	const router = useRouter();

	useEffect(() => {
		setPosts(dataPosts.data);
	}, []);

	useEffect(() => {
		if (!searchKey) {
			setResults([]);
		} else {
			handleSeachPosts();
		}
	}, [searchKey]);

	const handleSeachPosts = () => {
		const items = posts.filter((element) => element.title.includes(searchKey));

		setResults(items);
	};

	return (
		<div className='pt-4'>
			<Head>
				<title>MindX</title>
			</Head>
			<Card
				extra={
					<Input.Search
						size='large'
						value={searchKey}
						onChange={(val) => setSearchKey(val.target.value)}
						placeholder='Search'
						allowClear
					/>
				}
				title='Posts'>
				<Button onClick={() => router.push('/bai-viet/them-bai-viet')}>
					Add new
				</Button>
				<List
					pagination={[
						{
							position: 'center',
						},
					]}
					dataSource={searchKey ? results : posts}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={
									<Link
										href={`/bai-viet/${replaceName(item.title)}/${item._id}`}>
										{item.title}
									</Link>
								}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</div>
	);
}

// This function gets called at build time
export async function getStaticProps() {
	const res = await fetch(`${appConfig.BASE_API}/post/`);
	const posts = await res.json();

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			dataPosts: posts,
		},
	};
}

export default HomeScreen;
