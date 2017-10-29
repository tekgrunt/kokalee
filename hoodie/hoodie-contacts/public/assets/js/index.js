$('#contactForm').submit(function(event) {
  // prevent page reload
  event.preventDefault();

  var name = $('#name').val();
  var email = $('#email').val();
  var mobile = $('#mobile').val();

  // Save the contact to the database with Hoodie
  hoodie.store.add({
    name: name,
    mobile: mobile,
    email: email
  });  

  var newContact = '<tr><td>' + name + '</td><td>' + mobile + '</td><td>' + email + '</td></tr>'
  $("#contactList tbody").append(newContact);

  $('#contactForm')[0].reset();
});
