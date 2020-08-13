const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes([helper.Blogstest[0]])).toBe(helper.Blogstest[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.Blogstest)).toBe(36)
  })
})
