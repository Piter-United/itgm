import React from 'react'
import { filterActivity } from './activity'

const data = [
  ['name test1', 'desctiption', 'community'],
  ['name Статья про JS', 'desctiption', 'PiterJS'],
  ['name Статья про Питон', 'desctiption', 'PiterPy'],
  ['name Статья про Питон 1', 'desctiption', 'PiterPy']
].map(v => ({
  resource: {
    name: v[0],
    desctiption: v[1]
  },
  community: {
    resource: { name: v[2] }
  }
}))

test('filterActivity Отобрать стаьи про питон', () => {
  const f = filterActivity('Питон')
  const result = data.map(f).filter(v => v)
  const len = result.length
  console.log(len)
  expect(len).toBe(2)
})
