'use client'
import '@/styles/globals.css'
import React from 'react'
import { Layout } from 'antd'
import { FooterComponent, HeaderComponent } from '@/components'

const { Content } = Layout

export default function App({ Component, pageProps })
{
  return (
    <Layout>
      <HeaderComponent />
      <Layout>
        {/* <Sider theme='light' collapsed /> */}
        <Content>
          <div className='container mt-4' style={{ height: `100vh` }}>
            <Component {...pageProps} />
          </div>
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>

  )

}

