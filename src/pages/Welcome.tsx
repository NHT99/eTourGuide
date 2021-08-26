import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import {  FormattedMessage } from 'umi';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text >{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message="Mạnh mẽ và nhanh chóng"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="Xin chào bạn đến với" />{' '}
          <a
            href="https://localhost:8000/manageTopic"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="MTG System" />
          </a>
        </Typography.Text>
        <CodePreview>Chào mừng tới hệ thống quản lí dẫn đường viện bảo tàng</CodePreview>
      
       
      </Card>
    </PageContainer>
  );
};
