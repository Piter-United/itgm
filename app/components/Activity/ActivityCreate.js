import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Button, Form, Input, Select, Spin, Typography } from 'antd'

import { CREATE, GET_BY_ID, UPDATE, DISABLE } from 'store/activity'

import '../Heading/Heading.css'

import { GET_LIST } from 'store/community'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

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
    // console.log(activity)
    // console.log(user)
    onDisableActivity()
  }

  return (
    <Form
      className="form form_view_profile"
      layout="vertical"
      onSubmit={handleSubmit}
    >
      <div className="form__header">
        <Title className="Heading Heading_level_1">
          {act && act.id ? 'Редактирование темы' : 'Добавление новой темы'}
        </Title>
      </div>
      <Form.Item label="Название">
        {getFieldDecorator('name', {
          initialValue: (act && act.name) || '',
          rules: [
            {
              required: true,
              message: 'Это поле обязательно ¯\\_(ツ)_/¯'
            }
          ]
        })(<Input placeholder="Введите название темы" autoFocus />)}
      </Form.Item>
      <Form.Item label="Описание темы">
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
          />
        )}
      </Form.Item>
      <Form.Item label="Cообщество">
        {getFieldDecorator('community', {
          initialValue:
            act && act.community && act.community.id
              ? act.community.id
              : '33e0bed1-9ac2-420a-9e4e-eeb05a96d464'
        })(
          <Select
            showSearch
            placeholder="Выберите сообщество из списка"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
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
      <Form.Item label="Метки">
        {getFieldDecorator('tags', {
          initialValue: (act && act.tags) || []
        })(
          <Select
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
      <Form.Item>
        <Button type="danger" onClick={handleDelete}>
          Удалить
        </Button>
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
    console.log(activityInfo)
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
        <WrappedActivityCreateForm
          user={user}
          community={community}
          activity={activityInfo}
          onCreateActivity={onCreateActivity}
          onDisableActivity={onDisableActivity}
        />
      </div>
    </InnerPageContentContainer>
  )
}

export default ActivityCreate
