import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useAppContext } from './hooks/useAppContext';
import UserProfile from './components/UserProfile';
import AssessmentsPage from './components/assessments/AssessmentsPage';
import TrackSubmissionsPage from './components/submissions/TrackSubmissionsPage';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const { themeMode } = useAppContext();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 24px',
          background: themeMode === 'dark' ? '#001529' : '#1890ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Title 
              level={3} 
              style={{ 
                color: 'white', 
                margin: 0,
                marginRight: 48,
                fontWeight: 600
              }}
            >
              Invigilator Assessment Hub
            </Title>
            
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['assessments']}
              style={{ 
                backgroundColor: 'transparent',
                borderBottom: 'none',
                minWidth: 0,
                flex: 1
              }}
              items={[
                {
                  key: 'assessments',
                  icon: <FileTextOutlined />,
                  label: 'Downloaded Assessments'
                }
              ]}
            />
          </div>
          
          <UserProfile />
        </Header>
        
        <Content style={{ 
          padding: 0,
          background: themeMode === 'dark' ? '#141414' : '#f0f2f5'
        }}>
          <Routes>
            <Route path="/" element={<AssessmentsPage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/exam/:examId/submissions" element={<TrackSubmissionsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>

        <Footer style={{ 
          textAlign: 'center',
          background: themeMode === 'dark' ? '#001529' : '#f0f2f5',
          color: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
        }}>
          Invigilator Assessment Hub ©2024 Created with React & Ant Design
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
