describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'sinasi',
      username: 'sinasi',
      password: 'sinasi'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {//17
    cy.contains('Blog Application')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('sinasi')
      cy.get('#password').type('sinasi')
      cy.get('#login-button').click()

      cy.contains('sinasi logged in')
    })

    it('fails with wrong credentials', function() {//18
      cy.contains('login').click()
      cy.get('#username').type('sinasi')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'username or password wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'sinasi Logged in')
    })


  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('sinasi')
      cy.get('#password').type('sinasi')
      cy.get('#login-button').click()

      // log in user here
    })

    it('A blog can be created', function() {//19
      // ...
      cy.contains('new Blog').click()
      cy.get('input[name="title"]').type('A litte Live ')
      cy.get('input[name="author"]').type('Tomas Jansen')
      cy.get('input[name="url"]').type('a blog created by cypress')

      cy.contains('create').click()
      cy.contains('a new blog A litte Live added')
    })
    describe('Check Like and Delete', function() {

      beforeEach(function() {
        cy.contains('new Blog').click()
        cy.get('input[name="title"]').type('A litte Live ')
        cy.get('input[name="author"]').type('Tomas Jansen')
        cy.get('input[name="url"]').type('a blog created by cypress')

        cy.contains('create').click()
        cy.contains('view').click()
      })
      it('checks that user can like a blog', function() {//20
        cy.contains('like').click()

      })


      it('checks that user can Delete a blog', function() {//21
        cy.contains('Delete').click()

        cy.contains('Deleted A litte Live by Tomas Jansen')

      })
      it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function() {//21
        cy.contains('new Blog').click()
        cy.get('input[name="title"]').type('Tom and Jerry ')
        cy.get('input[name="author"]').type('Anonim')
        cy.get('input[name="url"]').type('a blog created by two ')

        cy.contains('create').click()
        cy.contains('view').click()

        cy.root().find('.blog').first().get('.blogHeader').contains('A litte Live')
        cy.root().find('.blog').last().contains('like').click()
        cy.root().find('.blog').first().get('.blogHeader').contains('Tom and Jerry')


      })
    })
  })
})