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

function storeUserTokens(id, tokens) {
  const updated = models.User.update({
    ga_access_token: tokens.access_token,
    ga_refresh_token: tokens.refresh_token
  }, { where: { id: id } });

  return updated;
}

function setToken(code, id) {
  const tokens = oauth2Client.getToken(code, function (err, tokens) {
    if (err) console.log(err);
    return storeUserTokens(id, tokens);
  });

  return tokens;
}

function getDrive(user) {
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

function driveCreate(user, file) {
  const drive = getDrive(user);

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

function gaGrantPermissions(user, file) {
  const drive = getDrive(user);

  const permissions = {
    'type': 'anyone',
    'role': 'reader'
  };

  const promise = new Promise((resolve, reject) => {
    drive.permissions.create({
      resource: permissions,
      fileId: file.google.id,
      supportsTeamDrives: true,
      fields: 'id',
    }, (err, res) => {
      if(err) return reject(err);
      return resolve(res);
    });
  });

  return promise;
}


function addAttachment(data, file) {
  data = Object.assign({}, data, {
    name: file.originalname,
    url: file.google.webViewLink,
    drive_id: file.google.id
  });

  const attachment = models.Attachment.create(data);
  return attachment;
}


function uploadFile(data, user, file) {
  return gaGrantPermissions(user, file)
    .then(() => {
      return addAttachment(data, file);
    })
    .catch(err => console.log(err));
}

module.exports = {
  getUrl,
  setToken,
  getDrive,
  driveCreate,
  uploadFile
}
