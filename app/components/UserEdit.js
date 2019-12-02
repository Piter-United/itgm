import React from 'react'

import { Avatar, Button, Form, Input, Select } from 'antd/es'
import useStoreon from 'storeon/react'
import { Card } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const UserEditForm = ({ form, user }) => {
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const _handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  console.log(user)
  return (
    <Form
      {...formItemLayout}
      style={{ width: 400, margin: '20px auto' }}
      onSubmit={_handleSubmit}
    >
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        {user.photo ? (
          <Avatar size={150} src={user.photo} />
        ) : (
          <Avatar size={150} icon="user" />
        )}
      </div>
      <Form.Item label="Фамилия Имя">
        {getFieldDecorator('name', {
          initialValue: user.name.formatted,
          rules: [
            {
              pattern: /[a-zа-я]+\s[a-zа-я]+/i,
              message: 'Не соответствует требованиям'
            },
            {
              required: true,
              message: 'Вы не ввели'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator('email', {
          initialValue: user.email,
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
      <Form.Item label="Компания">
        {getFieldDecorator('company', {
          initialValue: user.data.company || ''
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Специализация">
        {getFieldDecorator('specialization', {
          initialValue: user.data.specialization || ''
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Сообщество">
        {getFieldDecorator('community', {
          initialValue:
            user.data.community && user.data.community.id
              ? user.data.community.id
              : null
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Опыт в IT">
        {getFieldDecorator('experience', {
          initialValue: user.data.experience || ''
        })(
          <Select>
            <Select.Option value="до 1 года">до 1 года</Select.Option>
            <Select.Option value="1-3 года">1-3 года</Select.Option>
            <Select.Option value="3-5 лет">3-5 лет</Select.Option>
            <Select.Option value="5+ лет">5+ лет</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Несколько слов о себе">
        {getFieldDecorator('about', {
          initialValue: user.data.about || ''
        })(<Input.TextArea rows={6} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedUserEditForm = Form.create({ name: 'user_edit' })(UserEditForm)

const UserEdit = () => {
  const { user } = useStoreon('user')
  return (
    <div>
      <h2>Редактирование профиля</h2>
      <WrappedUserEditForm user={user} />
    </div>
  )
}

export default UserEdit
