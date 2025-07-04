import { useState } from 'react'
import { 
  Layout, 
  Button, 
  Card, 
  Space, 
  Typography, 
  Divider,
  notification 
} from 'antd'

const { Header, Content, Footer } = Layout
const { Title, Paragraph } = Typography

function App() {
  const [count, setCount] = useState(0)

  const showNotification = () => {
    notification.success({
      message: 'Success!',
      description: 'Ant Design is working perfectly!',
      placement: 'topRight',
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: '#001529'
      }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Invigilator Assessment Hub
        </Title>
      </Header>

      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Title level={2}>Welcome to React + Ant Design</Title>
                <Paragraph>
                  Your project is now configured with Ant Design components.
                  Click the buttons below to test the integration.
                </Paragraph>
              </div>

              <Divider>Interactive Demo</Divider>

              <div style={{ textAlign: 'center' }}>
                <Space size="middle">
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => setCount(count + 1)}
                  >
                    Count: {count}
                  </Button>
                  
                  <Button 
                    type="default" 
                    size="large"
                    onClick={showNotification}
                  >
                    Show Notification
                  </Button>
                </Space>
              </div>

              <Divider>Ready to Build</Divider>
              
              <Paragraph style={{ textAlign: 'center' }}>
                Edit <code>src/App.tsx</code> and start building your assessment hub!
              </Paragraph>
            </Space>
          </Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Invigilator Assessment Hub ©2024 - Built with React & Ant Design
      </Footer>
    </Layout>
  )
}

export default App
