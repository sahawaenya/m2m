const {verifyToken} = require("../helpers/jwt");
const {Match, User, Category, Field, MatchDetail, sequelize} = require("../models");
const {Op} = require('sequelize');
const CustomError = require('../helpers/customError');

class MatchController {
  static async addMatch(req, res, next) {
    try {
      const {access_token} = req.headers;
      const payload = verifyToken(access_token);
      const userLog = await User.findByPk(payload.id);
      if (!userLog) {
        throw new Error("user not found");
      }
      const {
        name,
        location,
        date,
        CategoryId,
        capacity,
        status,
        duration,
        type,
        description,
        FieldId,
      } = req.body;
      //   create new match, current capacity 0?
      const newMatch = await Match.create({
        name,
        location,
        date,
        CategoryId,
        capacity,
        currentCapacity: 0,
        status,
        duration,
        type,
        description,
        FieldId,
        UserId: payload.id,
      });
      res
        .status(201)
        .json({message: `success create new Match with id ${newMatch.id}`});
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteMatch(req, res, next) {
    try {
      const {access_token} = req.headers;
      const payload = verifyToken(access_token);
      const userLog = await User.findByPk(payload.id);
      if (!userLog) {
        throw new Error("user not found");
      }

      const {matchId} = req.params;
      const matchToDelete = await Match.findByPk(matchId);
      if (!matchToDelete) {
        throw new Error("data not found");
      }
      if (matchToDelete.UserId !== userLog.id) {
        throw new Error("dont have access to delete match");
      }
      const deleteMatch = await Match.destroy({
        where: {id: matchToDelete.id, UserId: userLog.id},
      });
      res
        .status(200)
        .json({message: `Match with id ${matchId} successfully deleted`});
    } catch (error) {
      res.send(error);
    }
  }

  static async getAllMatches(req, res, next) {
    try {
      const {userId, status} = req.query;
      let matches;
      if (Number(userId) && Number(userId) !== Number(req.user.id)) throw new CustomError('Forbidden', 'Forbidden', 403);

      const whereClause = {};

      if (status) {
        matches = await Match.findAll({
          include: [
            {
              model: MatchDetail,
              where: {status, UserId: userId}
            }
          ]
        });
      } else {
        if (userId) {
          whereClause.UserId = Number(userId);
        }else{
          whereClause.capacity = {[Op.gt]: sequelize.col('currentCapacity')};
        }
        matches = await Match.findAll({where: whereClause});
      }

      res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }

  static async getMatchesById(req, res) {
    try {
      const {matchId} = req.params;
      const match = await Match.findByPk(matchId, {
        attributes: ['id', 'name','type', 'location', 'date', 'capacity', 'currentCapacity', 'duration', 'description'],
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

  static async joinMatches(req, res, next) {
    try {
      const {matchId: MatchId} = req.params;
      const {id: UserId} = req.user;
      const status = 0;

      const [match, created] = await MatchDetail.findOrCreate({
        where: {MatchId, UserId},
        defaults: {
          MatchId,
          UserId,
          status
        }
      })

      if(!created) throw new CustomError('Cannot join this match more than one', 'Bad Request', 400);

      res.status(201).json(match);
    } catch (e) {
      next(e);
    }
  }

  static async showRequestParticipants(req, res, next) {
    try {
      const {matchId: MatchId} = req.params
      const {id} = req.user;

      const match = await Match.findByPk(MatchId);
      if(Number(match.UserId) !== Number(id)) throw new CustomError('Forbidden', 'Forbidden', 403);

      const result = await MatchDetail.findAll({
        include: [
          {
            model: User,
            attributes: ['name', 'bio']
          }
        ],
        where: {
          MatchId,
          status: 0
        }
      });
      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  }

  static async changeRequestParticipantsStatus(req, res, next) {
    try {
      const {status} = req.body;
      const {matchId: MatchId, participantId: UserId} = req.params;
      let message;

      await MatchDetail.update({status}, {
        where: {
          MatchId,
          UserId
        }
      })
      if (Number(status) === 1) {
        message = `user status with id ${UserId} changed from pending to approved`
        await Match.increment({currentCapacity: 1}, {where: {id: MatchId}});
      }else{
        message = `user status with id ${UserId} changed from pending to rejected`
      }

      res.status(200).json({
        message
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = MatchController;
