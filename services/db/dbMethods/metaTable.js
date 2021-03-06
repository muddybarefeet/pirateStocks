var tables = {
  schedule: {
    keyCol: 'key',
    valueCol: 'value'
  }
};

var Promise = require('bluebird');


module.exports = function (knex) {

  var module = {};

  module.upsert = function (key, dataToInsert) {

    var updated = false;

    return knex.select()
    .from('schedule')
    .where(tables.schedule.keyCol, key)
    .then(function (data) {
      if (data.length > 0) {
        updated = true;
        return knex('schedule')
        .where(tables.schedule.keyCol, key)
        .update('value', dataToInsert);
      } else {
        return knex('schedule')
        .insert({
          "key": key,
          "value": dataToInsert
        });
      }
    })
    .then(function (insertedData) {
      return (updated ? 'Updated' : 'Inserted') + ' one row.';
    })
    .catch(function (err) {
      console.log('err', err);
    });

  };

  module.get = function (key) {

    return Promise.try (function () {
      if (key !== "") {
        return knex.select('value')
        .from('schedule')
        .where(tables.schedule.keyCol, key);
      } else {
        return null;
      }
    })
    .then(function (data) {
      if (data) {
        return data[0].value.timeStamp;
      } else {
        return data;
      }
    });

  };

  module.delete = function (key) {

    return knex('accounts')
    .where('key', key)
    .del();//returns number of affected rows

  };

  return module;

};

