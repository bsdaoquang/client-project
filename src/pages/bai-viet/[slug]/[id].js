/** @format */

import React from 'react';

function PostDetail() {
	return <div>PostDetail</div>;
}

// // This function gets called at build time
// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts
// 	const res = await fetch('https://.../posts');
// 	const posts = await res.json();

// 	// Get the paths we want to pre-render based on posts
// 	const paths = posts.map((post) => ({
// 		params: { id: post.id },
// 	}));

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false };
// }

// This function gets called at build time
export async function getStaticProps({ params }) {
	const res = await fetch(`${appConfig.BASE_API}/post/${params.id}`);
	const posts = await res.json();

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			dataPosts: posts,
		},
	};
}
export default PostDetail;
