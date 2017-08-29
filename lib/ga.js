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
    scope: scopes,
    state: state
  });

  return url;
}

function setUserTokens(id, tokens) {
  const updated = models.User.update({
    ga_access_token: tokens.access_token,
    ga_refresh_token: tokens.refresh_token
  }, { where: { id: id } });

  return updated;
}

function setToken(code, id) {
  const tokens = oauth2Client.getToken(code, function (err, tokens) {
    if (!err) return setUserTokens(id, tokens);
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

function addAttachment(data, url) {
  data = Object.assign({}, data, { url });
  const attachment = models.Attachment.create(data);
  return attachment;
}

function gaCreate(user, file) {
  const drive = setDrive(user);

  const gaFile = new Promise((resolve, reject) => {
    drive.files.create({
      resource: {
        name: file.filename,
      },
      media: {
        mimeType: file.mimeType,
        body: fs.readFileSync(file.path)
      },
      fields: 'id, webContentLink, webViewLink'
    }, (err, res) => {
      if(err) return reject(err);
      return resolve(res);
    });
  })

  return gaFile;
}

function uploadFile(data, file) {

  return getUser(data.user_id)
  .then(user => {
    return gaCreate(user, file);
  })
  .then((res) => {
    return addAttachment(data, res.webViewLink);
  })
}

module.exports = {
  getUrl,
  setToken,
  uploadFile
}
