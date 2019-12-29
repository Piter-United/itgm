import React, { useEffect } from 'react'

import { Avatar, Button, Form, Input, Select } from 'antd/es'
import useStoreon from 'storeon/react'
import { Card, Slider, Tooltip, Icon, Row, Col } from 'antd'

import './Form/_view/Form_view_profile.css'

import { GET_LIST } from '../store/community'
import { UPDATE_USER } from '../store/user'

const UserEditForm = ({ form, user, community, onUpdateUser }) => {
  const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form
  const _handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onUpdateUser(values)
      }
    })
  }

  return (
    <Form
      className="form form_view_profile"
      layout="vertical"
      onSubmit={_handleSubmit}
    >
      <div className="form__header">
        <div className="form__user">
          <Form.Item className="form__username">
            {getFieldDecorator('name', {
              initialValue: user && user.name,
              rules: [
                {
                  pattern: /[a-zа-я]+\s[a-zа-я]+/i,
                  message: 'Не соответствует формату «Фамилия Имя»'
                },
                {
                  required: true,
                  message: 'Вы не представились'
                }
              ]
            })(
              <Input
                placeholder="Фамилия Имя"
                size="large"
                width="100%"
                autoFocus
                style={{ fontSize: '36px' }}
              />
            )}
          </Form.Item>
          {/* <div className="form__link">{user && user.profileUrl}</div> */}
        </div>
        <div className="form__avatar">
          {user && user.photo ? (
            <Avatar size={80} src={user.photo} />
          ) : (
            <Avatar size={80} icon="user" />
          )}
        </div>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              initialValue: user && user.email,
              rules: [
                {
                  type: 'email',
                  message: 'Не соответствует требованиям E-mail'
                },
                {
                  required: true,
                  message: 'Вы не ввели E-mail'
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Номер телефона">
            {getFieldDecorator('phone', {
              initialValue: (user && user.phone) || ''
            })(<Input placeholder="+7 9×× ×××-××-××" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={
              <span>
                Компания&nbsp;
                <Tooltip title="Пожалуйста, помогите нам собрать данные для ислледований. Заполните все обязательные поля.">
                  <Icon
                    type="info-circle"
                    theme="filled"
                    style={{ fontSize: '12px', color: '#9e9e9e' }}
                  />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('company', {
              initialValue: (user && user.company) || '',
              rules: [
                {
                  required: true,
                  message: 'Это поле обязательно ¯\\_(ツ)_/¯'
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Специализация">
            {getFieldDecorator('specialization', {
              initialValue: (user && user.specialization) || '',
              rules: [
                {
                  required: true,
                  message: 'Это поле обязательно ¯\\_(ツ)_/¯'
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Опыт в IT">
        {getFieldDecorator('experience', {
          initialValue: (user && parseInt(user.experience, 10)) || 0
        })(
          <Slider
            marks={{
              0: 'до 1 года',
              3: '1–3 года',
              5: '3–5 лет',
              8: '5+ годиков'
            }}
            min={0}
            max={8}
            step={null}
            tipFormatter={null}
          />
        )}
      </Form.Item>
      <Form.Item label="Основное сообщество">
        {getFieldDecorator('community', {
          initialValue:
            user && user.community && user.community.id
              ? user.community.id
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
      <Form.Item label="Дополнительные сообщества">
        {getFieldDecorator('communities', {
          initialValue: (user && user.communities.map(item => item.id)) || []
        })(
          <Select
            mode="multiple"
            placeholder="Выберите сообщества из списка"
            optionLabelProp="label"
          >
            {!community.loading &&
              community.list
                .filter(item => item.id !== getFieldValue('community'))
                .map(item => (
                  <Select.Option
                    value={item.id}
                    key={item.id}
                    label={item.name}
                  >
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
      <Form.Item label="Несколько слов о себе">
        {getFieldDecorator('about', {
          initialValue: (user && user.about) || ''
        })(
          <Input.TextArea
            rows={6}
            placeholder="Расскажите немного о себе, своих интересах и сфере деятельности."
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedUserEditForm = Form.create({ name: 'user_edit' })(UserEditForm)

const UserEdit = () => {
  const { user, community, dispatch } = useStoreon('user', 'community')

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  const formatCommunity = key => {
    const _community = community.list.find(_ => _.id === key)

    return {
      id: _community.id,
      resourceType: 'Community'
    }
  }

  const onUpdateUser = _user => {
    const newData = {
      ..._user,
      experience: _user.experience.toString(),
      communities: _user.communities.map(formatCommunity),
      community: formatCommunity(_user.community)
    }

    Object.keys(newData).map(key => {
      if (!newData[key]) {
        delete newData[key]
      }
    })

    dispatch(UPDATE_USER, newData)
  }

  return (
    <WrappedUserEditForm
      user={user}
      community={community}
      onUpdateUser={onUpdateUser}
    />
  )
}

export default UserEdit
