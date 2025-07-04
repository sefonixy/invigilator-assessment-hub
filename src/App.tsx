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
import { useTranslation } from 'react-i18next'
import { useAppContext } from './hooks/useAppContext'
import UserProfile from './components/UserProfile'

const { Header, Content, Footer } = Layout
const { Title, Paragraph } = Typography

function App() {
  const { t } = useTranslation()
  const { language } = useAppContext()
  const [count, setCount] = useState(0)

  const showNotification = () => {
    notification.success({
      message: t('notifications.success'),
      description: t('notifications.successDescription'),
      placement: 'topRight',
    })
  }

  const showLanguageChangeNotification = () => {
    notification.info({
      message: t('notifications.languageChanged'),
      description: t('notifications.languageChangedDescription', { 
        language: t(`languages.${language === 'en' ? 'english' : 'arabic'}`) 
      }),
      placement: 'topRight',
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#001529',
        padding: '0 24px'
      }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          {t('title')}
        </Title>
        
        <UserProfile />
      </Header>

      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Title level={2}>{t('welcome.title')}</Title>
                <Paragraph>
                  {t('welcome.description')}
                </Paragraph>
              </div>

              <Divider>{t('demo.title')}</Divider>

              <div style={{ textAlign: 'center' }}>
                <Space size="middle" wrap>
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => setCount(count + 1)}
                  >
                    {t('demo.countButton', { count })}
                  </Button>
                  
                  <Button 
                    type="default" 
                    size="large"
                    onClick={showNotification}
                  >
                    {t('demo.notificationButton')}
                  </Button>

                  <Button 
                    type="dashed" 
                    size="large"
                    onClick={showLanguageChangeNotification}
                  >
                    Test Language Notification
                  </Button>
                </Space>
              </div>

              <Divider>{t('demo.readyTitle')}</Divider>
              
              <Paragraph style={{ textAlign: 'center' }}>
                {t('welcome.editMessage')}
              </Paragraph>
            </Space>
          </Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        {t('footer')}
      </Footer>
    </Layout>
  )
}

export default App
