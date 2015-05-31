
/**
 * @todo replace with a reference to a Mongo collection
 */
var dataModel = { client: { sex: 'M' } }; 

/**
 * @method [bindModel  binds a data model to a template]
 * @param {Object} template - the template we are binding the data model to
 * @param {Object} model - the data model to be bound
 */
function bindModel (template, model) {

  function _setProperty (schema, path, value) {

    var obj    = schema,
        pList  = path.split('.'),
        elem;

    for (var i = 0, len = pList.length; i < len - 1; i++) {
      elem = pList[i];

      if( !obj[elem] ) obj[elem] = {};

      obj = obj[elem];
    }

    obj[ pList[len - 1] ] = value;
  }

  function _updateModel (event) {

    var key    = event.target.getAttribute('data-model'),
        value  = $( event.target ).val();

    _setProperty(model, key, value);
    $( '[data-model="' + key + '"]' ).val(value);
  }

  template.events({
    'change [data-model]': _updateModel,
    'keyup [data-model]': _updateModel
  });
}

if (Meteor.isClient) {

  Template.dataBindExample.helpers({

    client: function client () {
      return dataModel.client;
    },

    selectedSexIs: function (value) {
      return dataModel.client.sex === value ? 'selected' : '';
    }
  });

  bindModel(Template.dataBindExample, dataModel);
}
