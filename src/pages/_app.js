import { FooterComponent, HeaderComponent } from '@/components'
import '@/styles/globals.css'
import { Layout } from 'antd'

const { Content } = Layout

export default function App({ Component, pageProps })
{
  return <Layout>
    <HeaderComponent />
    <Content>
      <div className='container bg-white' style={{ height: '100vh' }}>
        <Component {...pageProps} />
      </div>
    </Content>
    <FooterComponent />
  </Layout>
}
