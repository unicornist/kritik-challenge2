var time = ISODate('2021-10-23T20:21:10.000Z');
var activityId = 1;

db.activities.aggregate([
  { $match: { id: activityId } },
  { $unwind: '$stages' },
  { $match: {
    'stages.startsAt': { $lt: time },
    'stages.endsAt': { $gt: time },
  } },
])