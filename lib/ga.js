const fs = require('fs');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const config = require('../config');
const models = require('../models');
const oauth2Client = new OAuth2(
  config.google.clientID,
  config.google.clientSecret,
  config.google.callbackUrl
);

function getUrl(state) {
  const scopes = 'https://www.googleapis.com/auth/drive.file';

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  return url;
}

function setUserTokens(tokens) {
  const updated = models.User.update({
    ga_access_token: tokens.access_token,
    ga_refresh_token: tokens.refresh_token
  }, { where: { id: id } });

  return updated;
}

function setToken(code, id) {
  const tokens = oauth2Client.getToken(code, function (err, tokens) {
    if (!err) return setUserTokens(tokens);
  });

  return tokens;
}

function setDrive(user) {
  oauth2Client.setCredentials({
    access_token: user.ga_access_token,
    refresh_token: user.ga_refresh_token
  });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  return drive;
}

function getUser(id) {
  const user = models.User.findById(id);
  return user;
}

function uploadFile(id, file) {

  return getUser(id).then(user => {
    const drive = setDrive(user);

    drive.files.create({
      resource: {
        name: file.filename,
      },
      media: {
        mimeType: file.mimeType,
        body: fs.readFileSync(file.path, 'utf8')
      },
      fields: 'id, webContentLink, webViewLink'
    }, (err, res) => {
      if(err) return err;

      console.log(err, res);
    });
  })

}

module.exports = {
  getUrl,
  setToken,
  uploadFile
}
