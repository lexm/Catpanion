function Shelter(opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele].$t;
  }, this);
}

Shelter.all = [];

Shelter.requestShelterList = function(location, callback) {
  var petFinderKey = 'fc112f63a02888e709b52b7778826df7';
  var petFinderApi = 'https://api.petfinder.com/shelter.find?format=json&key='+
  petFinderKey + '&location=' + location +'&callback=?';
  $.getJSON(petFinderApi)
  .done(function(petApiData) {callback(petApiData);})
  .error(function(err) {console.log('Error: ' + JSON.stringify(err));});
};

Shelter.requestShelterList('98109', function(data) {
  var shelterList = data.petfinder.shelters.shelter;
  Shelter.loadAll(shelterList);
});

Shelter.loadAll = function(list) {
  Shelter.all = list.map(function(ele) {
    return new Shelter(ele);
  });
};

function showShelters(){
  Shelter.all.forEach(function(a){
    $('#shelters').append(a.toHtml());
  });
} showShelters();

Shelter.prototype.toHtml = function(){
  var template = Handlebars.compile($('#shelter-template').html());
  return template(this);
};

$(function(){
  $('#shelter-list-button').click(function(){
  console.log('click');
  $('.breed-articles').hide();
  $('#shelters').show();
  });
});
