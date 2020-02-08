import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Row, Col, Form, Input, Select, Spin, Typography } from 'antd'

import {
  CREATE,
  GET_BY_ID,
  UPDATE,
  DISABLE,
  CLEAR_ACTIVITY_INFO
} from 'store/activity'

import '../Heading/Heading.css'
import './style.css'

import { GET_LIST } from 'store/community'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import { Breadcrumbs, Button } from '../UI'

const { Title } = Typography

const ActivityCreateForm = ({
  form,
  user,
  community,
  onCreateActivity,
  activity,
  onDisableActivity
}) => {
  const act = activity && activity.data && activity.data.activity
  const isNewActivity = act === null
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onCreateActivity(values)
      }
    })
  }

  // TODO check if user id === activity user
  const handleDelete = e => {
    e.preventDefault()
    onDisableActivity()
  }

  return (
    <Form
      className="form form_view_profile"
      layout="vertical"
      onSubmit={handleSubmit}
    >
      <div className="form__header">
        <Title className="Heading">
          {isNewActivity ? 'Добавление новой темы' : 'Редактирование темы'}
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
        })(
          <Input
            placeholder="Введите название темы"
            autoFocus
            className="FormItem-Control"
          />
        )}
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
            act && act.community && act.community.id ? act.community.id : [],
          rules: [
            {
              required: true,
              message: 'Это поле обязательно ¯\\_(ツ)_/¯'
            }
          ]
        })(
          <Select
            className="FormItem-Select"
            dropdownClassName="FormItem-SelectDropDown"
            placeholder="Выберите сообщество из списка"
            loading={community.loading}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {isNewActivity ? null : (
            <Button
              onClick={handleDelete}
              text="Удалить"
              color="secondary"
              className="Button_outline"
              style={{ marginRight: '20px' }}
            />
          )}
          <Button
            text="Отмена"
            asLink={true}
            url="/activity"
            color="secondary"
            className="Button_outline"
            style={{ marginRight: '20px' }}
          />
          <Button type="submit" text="Сохранить" onClick={handleSubmit} />
        </div>
      </Form.Item>
    </Form>
  )
}

const WrappedActivityCreateForm = Form.create({ name: 'user_edit' })(
  ActivityCreateForm
)

// TODO do not let user who is not activity to edit it, unless it is not author or manager
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
    } else {
      dispatch(CLEAR_ACTIVITY_INFO)
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

  const formatUser = user => {
    return {
      id: user.id,
      resourceType: 'User'
    }
  }

  const formatActivityCommunity = community => {
    return {
      id: community.id,
      resourceType: 'Community'
    }
  }

  const onCreateActivity = newActivity => {
    const newData = {
      ...newActivity,
      community: formatCommunity(newActivity.community),
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

  const onDisableActivity = () => {
    const { activity } = activityInfo.data
    const disabledActivity = {
      id: activity.id,
      user: formatUser(activity.user),
      active: false
    }

    dispatch(DISABLE, disabledActivity)
  }

  if (id && id.length && activityInfo.loading) {
    return <Spin size="large" />
  }

  return (
    <InnerPageContentContainer>
      <div className="content">
        <div className="Activity-Breadcrumbs">
          <Breadcrumbs path="/activity" viewPath="/Программа" />
        </div>
        <Row type="flex" justify="center" align="top">
          <Col lg={24} xl={16}>
            <WrappedActivityCreateForm
              user={user}
              community={community}
              activity={activityInfo}
              onCreateActivity={onCreateActivity}
              onDisableActivity={onDisableActivity}
            />
          </Col>
          <Col className="Activity-AsideRight" xl={8} lg={24}>
            <section className="Activity-AsideRightContent" />
          </Col>
        </Row>
      </div>
    </InnerPageContentContainer>
  )
}

export default ActivityCreate
