import React from 'react';

import { List, Icon, Row, Col, Button, notification } from 'antd';
import useStoreon from 'storeon/react';

const subjects = [
  {
    id: 1,
    name: 'Test',
    about: 'Test description\nsuper duper theme',
    community: {
      id: 'id1',
      name: 'PiterJS'
    },
    tags: ['a', 'b', 'c'],
    author: {
      id: 'github-584816',
      name: 'Mikhail Poluboyarinov'
    },
    likes: 100
  },
  {
    id: 2,
    name: 'Test 2',
    about: 'Test 2 description\nsuper duper theme',
    community: {
      id: 'id1',
      name: 'PiterJS'
    },
    tags: ['a', 'd'],
    author: {
      id: 'github-584816',
      name: 'Mikhail Poluboyarinov'
    },
    likes: 10
  }
];

const likeHandler = id => {
  if (id === 1) {
    notification.success({ message: 'Ваш голос учтен' });
  } else {
    notification.warn({ message: 'Вы уже голосовали' });
  }
};

const Home = () => {
  const { user } = useStoreon('user');
  return (
    <div className="content">
      <Row>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            dataSource={subjects}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <span
                    onClick={() => likeHandler(item.id)}
                    key={`list-item-like-${item.id}`}
                  >
                    <Icon type="like-o" />
                    {item.likes}
                  </span>
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={
                    <div>
                      {item.community.name} ({item.tags.join(',')})
                    </div>
                  }
                />
                {item.about}
              </List.Item>
            )}
          />
        </Col>
        <Col span={6}>
          {user && <Button icon="plus-circle">Добавить</Button>}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
