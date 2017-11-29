import { SteamUser } from './../js/steamach-steamuser.js';

describe('SteamUser', function () {
  let testUser;
  var value;

  beforeEach(function() {
    testUser = new SteamUser("76561198004895973");
    setTimeout(function() {
      value = 0;
      done();
    }, 1000);
  })

  it("Should be able to return information about the steam user", function(done) {
    expect(testUser.passed).toEqual(true);
    done();
  });
  //
  // it("Should be able to return an array of the steam user's games", function() {
  //   let library = testUser.GetLibrary();
  //   expect(library.count).toBeGreaterThan(0);
  // });

})
