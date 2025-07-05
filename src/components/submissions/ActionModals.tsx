import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface ActionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  type: 'paper' | 'unlock' | 'restart';
  examineeFullName: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  type,
  examineeFullName
}) => {
  const getModalConfig = () => {
    switch (type) {
      case 'paper':
        return {
          title: 'Switch to Paper Mode',
          icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
          content: (
            <div>
              <Paragraph>
                You are about to switch <Text strong>{examineeFullName}</Text> to paper mode.
              </Paragraph>
              <Paragraph style={{ color: '#fa8c16' }}>
                <WarningOutlined style={{ marginRight: 8 }} />
                Warning: Once switched to paper mode, the student will not be able to return to the online test.
              </Paragraph>
            </div>
          ),
          confirmText: 'Switch to Paper',
          confirmDanger: true
        };
      case 'unlock':
        return {
          title: 'Unlock Session',
          icon: <ExclamationCircleOutlined style={{ color: '#1890ff' }} />,
          content: (
            <div>
              <Paragraph>
                You are about to unlock the session for <Text strong>{examineeFullName}</Text>.
              </Paragraph>
              <Paragraph>
                This will allow the student to resume their exam session.
              </Paragraph>
            </div>
          ),
          confirmText: 'Unlock Session',
          confirmDanger: false
        };
      case 'restart':
        return {
          title: 'Restart Session',
          icon: <WarningOutlined style={{ color: '#ff4d4f' }} />,
          content: (
            <div>
              <Paragraph>
                You are about to restart the session for <Text strong>{examineeFullName}</Text>.
              </Paragraph>
              <Paragraph style={{ color: '#ff4d4f' }}>
                <WarningOutlined style={{ marginRight: 8 }} />
                Warning: This action will completely delete the current results of the examinee and allow them to start the exam again.
              </Paragraph>
              <Paragraph style={{ color: '#ff4d4f' }}>
                This action cannot be undone.
              </Paragraph>
            </div>
          ),
          confirmText: 'Restart Session',
          confirmDanger: true
        };
      default:
        return {
          title: '',
          icon: null,
          content: null,
          confirmText: 'Confirm',
          confirmDanger: false
        };
    }
  };

  const config = getModalConfig();

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {config.icon}
          <span style={{ marginLeft: 8 }}>{config.title}</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger={config.confirmDanger}
          onClick={onConfirm}
        >
          {config.confirmText}
        </Button>
      ]}
      width={500}
    >
      {config.content}
    </Modal>
  );
};

export default ActionModal; 