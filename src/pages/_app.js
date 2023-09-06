/** @format */

import { FooterComponent, HeaderComponent } from '@/components';
import store from '@/redux/store';
import '@/styles/globals.css';
import { Layout } from 'antd';
import { Provider } from 'react-redux';

const { Content } = Layout;

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<HeaderComponent />
				<Content>
					<div className='container bg-white' style={{ height: '100vh' }}>
						<Component {...pageProps} />
					</div>
				</Content>
				<FooterComponent />
			</Layout>
		</Provider>
	);
}
