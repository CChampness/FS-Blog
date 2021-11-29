const { Painting } = require('../models');

const paintingdata = [
  {
    title: 'Blossoming Apricot',
    blogger: 'LedyX',
    exhibition_date: 'March 30, 2018',
    gallery_id: 1,
    content:
      'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers',
    blogger: 'WStudio',
    exhibition_date: 'May 05, 2017',
    gallery_id: 1,
    content: 'Pink cosmos flowers against a blue sky.',
  },
  {
    title: 'Sand + Sea = Summer',
    blogger: 'S_Photo',
    exhibition_date: 'June 10, 2019',
    gallery_id: 2,
    content: 'Sandy beach with the blue sea and sky in the background.',
  },
  {
    title: 'Beach Chairs',
    blogger: 'icemanphotos',
    exhibition_date: 'July 4, 2020',
    gallery_id: 2,
    content: 'Two beach chairs under a beach umbrella on the beach.',
  },
  {
    title: 'Beach Sunrise',
    blogger: 'VRstudio',
    exhibition_date: 'August 14, 2016',
    gallery_id: 2,
    content: 'Sun setting in the horizon with waves lapping the shore.',
  },
  {
    title: 'Fall Colors',
    blogger: 'DrivingJack',
    exhibition_date: 'October 15, 2018',
    gallery_id: 3,
    content:
      'Trees with red, orange, yellow leaves reflected on a still lake.',
  },
  {
    title: 'Autumn Mountains',
    blogger: 'Vitalii_Mamchuk',
    exhibition_date: 'November 3, 2016',
    gallery_id: 3,
    content:
      'Mountains with red and yellow leaves against a background of hazy rolling hills.',
  },
  {
    title: 'Frozen River',
    blogger: 'Vlad Sokolovsky',
    exhibition_date: 'December 24, 2020',
    gallery_id: 4,
    content:
      'Trees with white frozen branches reflected on a frozen river against a light pink sky.',
  },
  {
    title: 'Winter Home',
    blogger: 'Smit',
    exhibition_date: 'January 20, 2018',
    gallery_id: 4,
    content:
      'Log cabin blanketed in heavy white snow with tall snow covered pine trees in the background.',
  },
];

const seedPaintings = () => Painting.bulkCreate(paintingdata);

module.exports = seedPaintings;
