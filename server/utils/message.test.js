var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);
    
    // assert from match
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
    // assert text match
    // assert createdAt - number
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });

});