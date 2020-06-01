import { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import '@/styles/vars.css'
import '@/styles/global.css'
import { Row, Col, Layout, Typography } from 'antd'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Layout.Header>
          <Typography.Text strong style={{color: 'white'}}>
            PAY.JP + Next.js サンプル
          </Typography.Text>
        </Layout.Header>
        <Layout.Content>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <Component {...pageProps} />
            </Col>
            <Col span={2}></Col>
          </Row>
        </Layout.Content>
        <Layout.Footer>&copy; 2020 Hiroyuki Matsuo</Layout.Footer>
      </Layout>
    </>
  )
}
