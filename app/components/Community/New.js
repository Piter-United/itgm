import React from 'react'
import useStoreon from 'storeon/react'

import { Form, Input, Select, Button, Icon } from 'antd'

import { CREATE } from '../../store/community'

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

const NewCommunityForm = ({ form, onCreateCommunity }) => {
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    setFieldsValue
  } = form
  const _handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const social = []
        values.keys.forEach(key => {
          social.push({
            icon: values.type[key],
            link: values.link[key]
          })
        })
        onCreateCommunity({
          name: values.name,
          description: values.description,
          social
        })
      }
    })
  }

  const add = () => {
    const keys = getFieldValue('keys')
    const nextKeys = keys.concat(keys.length)
    setFieldsValue({
      keys: nextKeys
    })
  }

  const remove = id => {
    const keys = getFieldValue('keys')
    if (keys.length === 1) {
      return
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== id)
    })
  }

  getFieldDecorator('keys', { initialValue: [0] })

  const formItems = getFieldValue('keys').map((k, index) => (
    <Form.Item key={index} style={{ marginBottom: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center'
        }}
      >
        {getFieldDecorator(`type[${k}]`, {
          initialValue: 'global',
          rules: [{ required: true, message: 'Вы не ввели описание' }]
        })(
          <Select style={{ width: '100px' }}>
            <Select.Option value="global">Сайт</Select.Option>
            <Select.Option value="vk">VK</Select.Option>
            <Select.Option value="twitter">Twitter</Select.Option>
            <Select.Option value="youtube">Youtube</Select.Option>
            <Select.Option value="facebook">Facebook</Select.Option>
            <Select.Option value="github">Github</Select.Option>
          </Select>
        )}
        {getFieldDecorator(`link[${k}]`, {
          rules: [{ required: true, message: 'Вы не ввели описание' }]
        })(<Input />)}
        {getFieldValue('keys').length > 1 ? (
          <Icon type="minus-circle-o" onClick={() => remove(k)} />
        ) : null}
      </div>
    </Form.Item>
  ))

  return (
    <Form
      layout="vertical"
      className="form form_view_profile"
      onSubmit={_handleSubmit}
    >
      <Form.Item label="Название">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Вы не ввели название' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Описание">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Вы не ввели описание' }]
        })(<Input.TextArea />)}
      </Form.Item>
      <Form.Item label="Социальные сети">{formItems}</Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> Добавить
        </Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedNewCommunityForm = Form.create({ name: 'new_community' })(
  NewCommunityForm
)
const NewCommunity = () => {
  const { dispatch } = useStoreon()
  const onCreateCommunity = community => {
    dispatch(CREATE, community)
  }
  return (
    <div>
      <h2>Добавить сообщество</h2>
      <WrappedNewCommunityForm onCreateCommunity={onCreateCommunity} />
    </div>
  )
}

export default NewCommunity
