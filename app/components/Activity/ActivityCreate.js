import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Row, Col, Form, Button, Input, Select, Spin, Typography } from 'antd'

import { CREATE, GET_BY_ID, UPDATE } from 'store/activity'

import '../Heading/Heading.css'
import './style.css'

import { GET_LIST } from 'store/community'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import { Breadcrumbs } from '../UI'

const { Title } = Typography

const AcivityCreateForm = ({
  form,
  // eslint-disable-next-line no-unused-vars
  user,
  community,
  onCreateActivity,
  activity
}) => {
  const act = activity && activity.data && activity.data.activity
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onCreateActivity(values)
      }
    })
  }

  return (
    <div>
      <div className="Activity-Breadcrumbs">
        <Breadcrumbs path="/activity" viewPath="/Программа" />
      </div>
      <Row type="flex" justify="center" align="top">
        <Col lg={24} xl={16}>
          <Form
            className="form form_view_profile"
            layout="vertical"
            onSubmit={handleSubmit}
          >
            <div className="form__header">
              <Title className="Heading">
                {act && act.id ? 'Редактирование темы' : 'Добавление новой темы'}
              </Title>
            </div>
            <Form.Item label="Название" className="FormItem">
              {getFieldDecorator('name', {
                initialValue: (act && act.name) || '',
                rules: [
                  {
                    required: true,
                    message: 'Это поле обязательно ¯\\_(ツ)_/¯'
                  }
                ]
              })(<Input placeholder="Введите название темы" autoFocus className="FormItem-Control"/>)}
            </Form.Item>
            <Form.Item label="Описание темы" className="FormItem">
              {getFieldDecorator('description', {
                initialValue: (act && act.description) || '',
                rules: [
                  {
                    required: true,
                    message: 'Это поле обязательно ¯\\_(ツ)_/¯'
                  }
                ]
              })(
                <Input.TextArea
                  rows={6}
                  placeholder="Введите краткое описание темы"
                  className="FormItem-Control"
                />
              )}
            </Form.Item>
            <Form.Item label="Cообщество" className="FormItem">
              {getFieldDecorator('community', {
                initialValue:
                  act && act.community && act.community.id
                    ? act.community.id
                    : '33e0bed1-9ac2-420a-9e4e-eeb05a96d464'
              })(
                <Select
                  className="FormItem-Select"
                  dropdownClassName="FormItem-SelectDropDown"
                  showSearch
                  placeholder="Выберите сообщество из списка"
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    console.log(input)
                    console.log(option)
                    return option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }}
                >
                  {!community.loading &&
                    community.list.map(item => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                        <span style={{ color: '#9e9e9e' }}>
                          {' '}
                          — {item.description}
                        </span>
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Метки" className="FormItem">
              {getFieldDecorator('tags', {
                initialValue: (act && act.tags) || []
              })(
                <Select
                  className="FormItem-Select"
                  dropdownClassName="FormItem-SelectDropDown"
                  mode="tags"
                  placeholder="Добавьте метки"
                  optionLabelProp="label"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className="Activity-AsideRight" xl={8} lg={24}>
          <section className="Activity-AsideRightContent" />
        </Col>
      </Row>
    </div>
  )
}

const WrappedAcivityCreateForm = Form.create({ name: 'user_edit' })(
  AcivityCreateForm
)

const ActivityCreate = ({
  match: {
    params: { id }
  }
}) => {
  const { user, community, dispatch, activityInfo } = useStoreon(
    'user',
    'community',
    'activityInfo'
  )

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  useEffect(() => {
    if (id && id.length > 0) {
      dispatch(GET_BY_ID, id)
    }
  }, [dispatch, id])

  const formatCommunity = key => {
    // eslint-disable-next-line no-underscore-dangle
    const _community = community.list.find(_ => _.id === key)

    return {
      id: _community.id,
      resourceType: 'Community'
    }
  }

  const onCreateActivity = newCommunity => {
    const newData = {
      ...newCommunity,
      community: formatCommunity(newCommunity.community),
      user: {
        id: user.id,
        resourceType: 'User'
      }
    }
    if (id && id.length > 0) {
      newData.id = id
      dispatch(UPDATE, newData)
    } else {
      dispatch(CREATE, newData)
    }
  }
  if (id && id.length && activityInfo.loading) {
    return <Spin size="large" />
  }

  return (
    <InnerPageContentContainer>
      <div className="content">
        <WrappedAcivityCreateForm
          user={user}
          community={community}
          activity={activityInfo}
          onCreateActivity={onCreateActivity}
        />
      </div>
    </InnerPageContentContainer>
  )
}

export default ActivityCreate
