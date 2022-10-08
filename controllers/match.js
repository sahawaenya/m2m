const { verifyToken } = require("../helpers/jwt");
const { Match, User } = require("../models");

class MatchController {
  static async addMatch(req, res, next) {
    try {
      const { access_token } = req.headers;
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
        .json({ message: `success create new Match with id ${newMatch.id}` });
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteMatch(req, res, next) {
    try {
      const { access_token } = req.headers;
      const payload = verifyToken(access_token);
      const userLog = await User.findByPk(payload.id);
      if (!userLog) {
        throw new Error("user not found");
      }

      const { matchId } = req.params;
      const matchToDelete = await Match.findByPk(matchId);
      if (!matchToDelete) {
        throw new Error("data not found");
      }
      if (matchToDelete.UserId !== userLog.id) {
        throw new Error("dont have access to delete match");
      }
      const deleteMatch = await Match.destroy({
        where: { id: matchToDelete.id, UserId: userLog.id },
      });
      res
        .status(200)
        .json({ message: `Match with id ${matchId} successfully deleted` });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = MatchController;
