const models = require('../models');
const { sendMail } = require('./mail');

function findOrCreateTeam(data) {
  return models.Company
  .findOne({where: { team_name: data.team_name }})
  .then(company => {
    if(company) return company;
    return models.Company.create(data);
  })
}

function register(req, res) {
  const { body, params } = req;

  if(params.type === 'team') {
    return findOrCreateTeam(body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json(err));
  }

  if(params.type === 'company') {
    return models.Company.update(body, { where: { id: body.id } })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  }

  if(params.type === 'user') {
    return models.Company.findOne({ where: {id: body.company_id}, include: [{ model: models.User, fields: ['id'] }] })
      .then((company) => {
        let userData = body;

        if(company.users.length === 0) {
          userData = Object.assign(body, {role: 'owner'});
          const domain = userData.email ? userData.email.split('@')[1] : '';
          return company.update({ domain }).then(() => {
            return userData
          });
        } else {
          return new Promise((resolve, reject) => {
            userData = Object.assign(body, {role: 'member'});
            return resolve(userData);
          });
        }
      })
      .then(userData => models.User.create(userData))
      .then(user => {
        const token = getToken(user);
        sendMail(user);
        delete user.password;
        delete user.verify_token;

        res.status(201).json({token, user});
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = register;
