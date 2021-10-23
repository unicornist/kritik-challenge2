db.activities.insertMany([
  {
    id: 1,
    title: 'Activity 1',
    stages: [
      {
        id: 11,
        title: 'Stage A',
        startsAt: ISODate('2021-10-23T20:20:00.000Z'),
        endsAt: ISODate('2021-10-23T20:21:00.000Z')
      },
      {
        id: 12,
        title: 'Stage B',
        startsAt: ISODate('2021-10-23T20:21:00.000Z'),
        endsAt: ISODate('2021-10-23T20:22:00.000Z')
      },
      {
        id: 13,
        title: 'Stage C',
        startsAt: ISODate('2021-10-23T20:22:00.000Z'),
        endsAt: ISODate('2021-10-23T20:23:00.000Z')
      }
    ]
  },
  {
    id: 2,
    title: 'Activity 2',
    stages: [
      {
        id: 21,
        title: 'Stage A',
        startsAt: ISODate('2021-10-23T20:20:00.000Z'),
        endsAt: ISODate('2021-10-23T20:21:00.000Z')
      },
      {
        id: 22,
        title: 'Stage B',
        startsAt: ISODate('2021-10-23T20:21:00.000Z'),
        endsAt: ISODate('2021-10-23T20:22:00.000Z')
      },
      {
        id: 23,
        title: 'Stage C',
        startsAt: ISODate('2021-10-23T20:22:00.000Z'),
        endsAt: ISODate('2021-10-23T20:23:00.000Z')
      }
    ]
  }
])