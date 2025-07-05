import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import AssessmentsPage from './components/assessments/AssessmentsPage';
import TrackSubmissionsPage from './components/TrackSubmissionsPage';
import UserProfile from './components/UserProfile';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;



function App() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);





  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 64
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <Title 
              level={4} 
              style={{ 
                color: 'white', 
                margin: 0,
                marginRight: 24,
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap',
                fontSize: 'clamp(16px, 4vw, 20px)'
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
                flex: 1,
                display: windowWidth < 768 ? 'none' : 'flex'
              }}
              items={[
                {
                  key: 'assessments',
                  icon: <FileTextOutlined />,
                  label: windowWidth < 900 ? '' : 'Downloaded Assessments'
                }
              ]}
            />
          </div>
          
          <UserProfile />
        </Header>
        
        <Content style={{ 
          padding: 0,
          background: '#f0f2f5'
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
          background: '#f0f2f5',
          color: 'rgba(0, 0, 0, 0.65)'
        }}>
          Invigilator Assessment Hub ©2024 Created with React & Ant Design
        </Footer>
      </Layout>


    </Router>
  );
}

export default App;
