'use strict';

const mm = require('mm');
const os = require('os');
const utils = require('../../lib/utils');

describe('test/utils/index.test.js', () => {

  afterEach(mm.restore);

  describe('utils.getHomedir()', () => {
    it('should return process.env.HOME', () => {
      if (os.userInfo && os.userInfo().homedir) {
        const userInfo = os.userInfo();
        delete userInfo.homedir;
        mm(os, 'userInfo', () => userInfo);
      }
      utils.getHomedir().should.equal(process.env.HOME);
    });

    it('should return /home/admin when process.env.HOME is not exist', () => {
      mm(process.env, 'HOME', '');
      mm(os, 'userInfo', null);
      mm(os, 'homedir', null);
      utils.getHomedir().should.equal('/home/admin');
    });

    it('should return when EGG_HOME exists', () => {
      mm(process.env, 'EGG_HOME', '/path/to/home');
      utils.getHomedir().should.equal('/path/to/home');
    });
  });
});