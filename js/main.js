$(document).ready(function() {

  var data = [];

  // get the items out of the json file
  $.getJSON('items.json', function(json) {
    data = json;
  }).done(function() {
    addItems(data);
  });

  
    // add the items from the json file to the DOM using the template in index.html

function addItems(items) {
  for(var i = 0; i < items.length; i++) {
    item = items[i];
    $('<div class="list-item">' +
        '<div class="list-item-image">' +
          '<img src="img/' + item.image + '" alt="">' +
        '</div>' +
        '<div class="list-item-header">' +
          '<span class="list-item-name">' + item.name + '</span>' +
          '<span class="list-item-price">' + item.price + '</span>' +
        '</div>' +
        '<div class="list-item-add">' +
          '<a href="#" class="button">Add to cart</a>' +
        '</div>' +
      '</div>'
      ).appendTo('.items');
  }
}

  // create a function for updating the cart total located at the bottom of `#cart` based on the items currently in the cart
function updateTotal() {
  total = 0;
  $('.cart-item-price').each(function() {
    total += parseInt($(this).html().substring(1));
  });
  $('#cart-total').html('$' + total);
}

  // attach an event listener to all `.buttons` in the `.list-item`s to detect clicks
    // when clicked, add the item to the table in `#cart` using the template in index.html
    // run the function you created to update the total
$(document).on('click','.list-item-add .button', function(e) {
  e.preventDefault();
  var $parent = $(this).parents('.list-item');
  var name = $parent.find('.list-item-name').html();
  var price = $parent.find('.list-item-price').html();
    $('<tr class="cart-item">' +
        '<td class="cart-item-name">' + name +'</td>' +
        '<td class="cart-item-price">' + price + '</td>' +
        '<td class="cart-item-remove"><a href="#" class="button">Remove</a></td>' +
      '</tr>'
    ).appendTo('#cart');
    updateTotal();
});


  // attach an event listener to all `.buttons` in the `.cart-item`s to detect clicks
    // when clicked, remove the item from the table in `#cart`
    // run the function you created to update the total
$(document).on('click','.cart-item-remove .button', function(e) {
  e.preventDefault();
  $(this).parents('.cart-item').remove();
  updateTotal();
})

});
