const {Match, User, Category, Field, MatchDetail, sequelize} = require('../models');
const {Op} = require('sequelize');

class MatchController {
  static async index(req, res) {
    try {
      const {userId, status} = req.query;
      let matches;
      const whereClause = {
        capacity: {[Op.gt]: sequelize.col('currentCapacity')}
      }

      if (status) {
        console.log(userId, status)
        matches = await Match.findAll({
          where: whereClause,
          include: [
            {
              model: MatchDetail,
              where: {status, UserId: userId}
            }
          ]
        });
      } else {
        if (userId) {
          whereClause.UserId = Number(userId)
        }
        matches = await Match.findAll({where: whereClause});
      }

      res.status(200).json(matches);
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  }

  static async findById(req, res) {
    try {
      const {matchId} = req.params;
      const match = await Match.findByPk(matchId, {
        attributes: ['id', 'name', 'location', 'date', 'capacity', 'currentCapacity', 'duration', 'description'],
        include: [
          {model: Category, attributes: ['name', 'image']},
          {model: Field, attributes: ['name', 'phoneNumber', 'location', 'image', 'price', 'openHour', 'closeHour']}
        ]
      });
      res.status(200).json(match);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }

  static async joinMatches(req, res) {
    try {
      const {matchId: MatchId} = req.params;
      //const {userId} = req.users;
      const userId = 3;
      const status = 0;
      const result = await MatchDetail.create({MatchId, UserId: userId, status});
      res.status(201).json(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }

  static async showRequestParticipants(req, res) {
    try {
      const {matchId: MatchId} = req.params
      const result = await MatchDetail.findAll({
        where: {
          MatchId,
          status: 0
        }
      });
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }

  static async changeRequestParticipantsStatus(req, res) {
    try {
      const {status} = req.body;
      const {matchId: MatchId, participantId: UserId} = req.params;
      console.log(status, MatchId, UserId);
      const result = await MatchDetail.update({status}, {
        where: {
          MatchId,
          UserId
        }
      })
      if (Number(status) === 1) {
        await Match.increment({currentCapacity: 1}, {where: {id: MatchId}});
      }
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }
}

module.exports = MatchController
