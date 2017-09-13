const fs = require('fs');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const config = require('../config');
const models = require('../models');


function getOauth() {
  const oauth2Client = new OAuth2(
    config.google.clientID,
    config.google.clientSecret,
    config.google.callbackUrl
  );

  return oauth2Client;
}

function getUrl(state) {
  const scopes = 'https://www.googleapis.com/auth/drive';
  const oauth2Client = getOauth();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    state: state
  });

  return url;
}

function getUser(id) {
  return Models.User.findOne({ where: { id: id } });
}

function storeUserTokens(id, tokens) {
  if(tokens) {
    const updated = models.User.update({
      ga_access_token: tokens.access_token,
      ga_refresh_token: tokens.hasOwnProperty('refresh_token') ? tokens.refresh_token : '',
      ga_expiry_date: tokens.expiry_date
    }, { where: { id: id } });
    return updated;
  }

}

function cleanUserAccessToken(id) {
  const updated = models.User.update({
    ga_access_token: null,
  }, { where: { id: id } });

  return updated;
}

function setToken(code, id) {
  const oauth2Client = getOauth();
  const tokens = oauth2Client.getToken(code, function (err, tokens) {
    if (err) console.log(err);
    return storeUserTokens(id, tokens);
  });

  return tokens;
}

function setAuth(user) {
  const oauth2Client = getOauth();

  const auth = new Promise((resolve, reject) => {
    oauth2Client.setCredentials({
      access_token: user.ga_access_token,
      refresh_token: user.ga_refresh_token
    });

    oauth2Client.refreshAccessToken(function(err, tokens) {
      storeUserTokens(user.id, tokens);
      oauth2Client.setCredentials(tokens);
    });

  });

  return auth;
}

function getDrive(user) {
  const auth = setAuth(user);
  if(user.ga_refresh_token) {

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    });

    return drive;

  }

  return null;
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
  console.log(file);
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
