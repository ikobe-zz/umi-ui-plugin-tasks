import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './ui.module.less';

export default api => {
  const { callRemote } = api;
  const [ demoData, setDemoData ] = useState({});
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await callRemote({
        type: 'demo/fetch',
      });
      setDemoData(data);
      setLoading(false);
    })();
  }, []);

  const DemoView = () => {
    if (loading) {
      return <Spin />;
    }
    return (
      <>
        <h1>umi plugin demo</h1>
        <div className={styles.normal}>
          {JSON.stringify(demoData)}
        </div>
      </>
    );
  };

  api.addPanel({
    title: 'umi plugin demo',
    path: '/demo',
    icon: 'environment',
    component: DemoView,
  });
};
