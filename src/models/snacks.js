const knex = require('../../db/knex');

////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
////////////////////////////////////////////////////////////////////

function getAllSnacks(users_id){
  return (
    knex('snacks')
  )
}

function getOneSnack(id){
  return (
    knex('snacks')
    .where({ id })
    .first()
  )
}


////////////////////////////////////////////////////////////////////
// Review Nested CRUD Methods
////////////////////////////////////////////////////////////////////

function createReview(snacks_id, title, text, rating, users_id ) {
  return (
    knex('reviews')
    .insert({ title, text, rating, snacks_id, users_id})
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function getAllReviews(snacks_id){
  return (
    knex('reviews')
    .where({ snacks_id })
  )
}

function getOneReview(snacks_id, id){
  return (
    knex('reviews')
    .where({ snacks_id })
    .where({ id })
    .first()
  )
}

function editReview(snacks_id, id, title, text, rating){
  return (
    knex('reviews')
    .where({ snacks_id })
    .where({ id })
    .update({ title, text, rating})
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function removeReview(snacks_id, id){
  return (
    knex('reviews')
    .where({ snacks_id })
    .where({ id })
    .del()
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )
}

////////////////////////////////////////////////////////////////////
// Export
////////////////////////////////////////////////////////////////////

module.exports = {
  getAllSnacks,
  getOneSnack,
  createReview,
  getAllReviews,
  getOneReview,
  editReview,
  removeReview
}
