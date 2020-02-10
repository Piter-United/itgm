import React, { useState } from 'react'
import useStoreon from 'storeon/react'

import { Form, Input, Select, Button, Icon, Typography, Upload } from 'antd'

import '../Heading/Heading.css'

import { CREATE } from 'store/community'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import { site_url } from '../../config'

const { Title } = Typography

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const UploadFile = ({ token, onChange }) => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(null)
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      console.log(info.file)
      onChange(info.file.response.avatar.url)
      console.log(info.file.response.avatar.url)
      getBase64(info.file.originFileObj, imageUrl => {
        setUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Загрузить</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      headers={{
        Authorization: `Bearer ${token}`
      }}
      action={`${site_url}/upload_image`}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {url ? (
        <img alt="Logo" src={url} style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

const NewCommunityForm = ({ form, onCreateCommunity, token }) => {
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    setFieldsValue
  } = form
  const handleSubmit = e => {
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
          logo: values.logo,
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
  getFieldDecorator('logo', { initialValue: null })

  const onFileUploaded = logo => {
    setFieldsValue({
      logo
    })
  }

  const formItems = getFieldValue('keys').map(k => (
    <Form.Item key={k} style={{ marginBottom: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {getFieldDecorator(`type[${k}]`, {
          initialValue: 'global',
          rules: [{ required: true, message: 'Вы не ввели описание' }]
        })(
          <Select style={{ width: '150px' }}>
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
          <Button
            onClick={() => remove(k)}
            style={{ position: 'absolute', right: '-50px', top: 0 }}
          >
            <Icon type="minus-circle-o" />
          </Button>
        ) : null}
      </div>
    </Form.Item>
  ))

  return (
    <Form
      layout="vertical"
      className="form form_view_profile"
      onSubmit={handleSubmit}
    >
      <div className="form__header">
        <Title className="Heading Heading_level_1">Добавить сообщество</Title>
      </div>
      <UploadFile token={token} onChange={onFileUploaded} />
      <Form.Item label="Название">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Вы не ввели название' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Описание">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Вы не ввели описание' }]
        })(<Input.TextArea rows={6} />)}
      </Form.Item>
      <Form.Item label="Сайт и социальные сети">{formItems}</Form.Item>
      <Form.Item>
        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> Добавить ссылку
        </Button>
      </Form.Item>
      <Form.Item>
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
  const { token, dispatch } = useStoreon('token')
  const onCreateCommunity = community => {
    dispatch(CREATE, community)
  }
  return (
    <InnerPageContentContainer>
      <div>
        <WrappedNewCommunityForm
          onCreateCommunity={onCreateCommunity}
          token={token}
        />
      </div>
    </InnerPageContentContainer>
  )
}

export default NewCommunity
