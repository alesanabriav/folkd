const fs = require('fs');
const google = require('googleapis');
const config = require('../config');
const models = require('../models');
const OAuth2 = google.auth.OAuth2;

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

/*
To convert this to a lib, I need to make this agnostic to
where the user it's going to store this info and get it.
*/

function getUser(id) {
  return Models.User.findOne({ where: { id: id } });
}

function storeUserTokens(id, tokens) {

  const updated = models.User.update({
    ga_access_token: tokens.access_token,
    ga_refresh_token: tokens.refresh_token,
    ga_expiry_date: tokens.expiry_date
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
  const expiryDate = user.ga_expiry_date;
  const currentTime = new Date().getTime();

  const auth = new Promise((resolve, reject) => {
    oauth2Client.setCredentials({
      access_token: user.ga_access_token,
      refresh_token: user.ga_refresh_token
    });

    if(expiryDate <= currentTime) {
      return oauth2Client.refreshAccessToken(function(err, tokens) {
        storeUserTokens(user.id, tokens);
        oauth2Client.setCredentials(tokens);
        return resolve(oauth2Client);
      });
    }

    return resolve(oauth2Client);
  });

  return auth;
}

function getDrive(user) {

  const drivePromise = setAuth(user)
    .then((auth) => {
      const drive = google.drive({
        version: 'v3',
        auth
      });

      return drive;
    })
    .catch(err => {
      return null;
    });

    return drivePromise;
}

function getUser(id) {
  const user = models.User.findById(id);
  return user;
}

async function driveCreate(user, file) {

  const fileStream = new Promise(function(resolve) {
    return resolve(file.stream);
  });

  const drive = await ga.getDrive(req.user);
  const stream = await fileStream;

  const gaFile = drive.files.create({
      resource: {
        name: file.filename,
      },
      media: {
        mimeType: file.mimeType,
        body: stream
      },
      fields: 'id, webContentLink, webViewLink'
    }, (err, res) => {
      if(err) return Promise.reject(err);
      return Promise.resolve(res);
  });

  return gaFile;
}

function gaGrantPermissions(user, file) {
  const drivePromise = getDrive(user);

  const permissions = {
    'type': 'anyone',
    'role': 'reader'
  };

  const promise = drivePromise.then(drive => {
    return drive.permissions.create({
      resource: permissions,
      fileId: file.google.id,
      supportsTeamDrives: true,
      fields: 'id',
    }, (err, res) => {
      if(err) return err;
      return res;
    });
  })
  .catch(err => console.log(err));

  return promise;
}

function storeAttachment(data, file) {
  data = Object.assign({}, data, {
    name: file.originalname,
    url: file.google.webViewLink,
    drive_id: file.google.id
  });

  const attachment = models.Attachment.create(data);
  return attachment;
}

async function uploadFile(data, user, file) {
  const permissions = await gaGrantPermissions(user, file);
  return storeAttachment(data, file);
}

module.exports = {
  getUrl,
  setToken,
  getDrive,
  driveCreate,
  uploadFile
}
