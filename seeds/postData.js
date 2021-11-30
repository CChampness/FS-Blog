const { Post } = require('../models');

const postdata = [
  {
    title: 'Syntax',
    blogger: 'Henry B.',
    post_date: 'March 30, 2018',
    topic_id: 1,
    content:
      'Variables, assignment, functions.',
  },
  {
    title: 'Arrow functions',
    blogger: 'Janet',
    post_date: 'May 05, 2017',
    topic_id: 1,
    content: 'When (and why) you should use ES6 arrow functions.',
  },
  {
    title: 'Classes',
    blogger: 'Will',
    post_date: 'June 10, 2019',
    topic_id: 2,
    content: 'The class selector is a way to select all of the elements with the specified class name, and apply styles to each of the matching elements.',
  },
  {
    title: 'Identifiers',
    blogger: 'iceman',
    post_date: 'July 4, 2020',
    topic_id: 2,
    content: 'Incorrect "an identifier expected" error with jQuery constructor ...',
  },
  {
    title: 'Pseudo Elements',
    blogger: 'VRstudio',
    post_date: 'August 14, 2016',
    topic_id: 2,
    content: 'A CSS pseudo-element is used to style specified parts of an element.',
  },
  {
    title: 'Insert an arrow in HTML',
    blogger: 'DrivingJack',
    post_date: 'October 15, 2018',
    topic_id: 3,
    content:
      'Left Arrow. ← U+02190. UNICODE.',
  },
  {
    title: 'Text formatting',
    blogger: 'Vitalii_Mamchuk',
    post_date: 'November 3, 2016',
    topic_id: 3,
    content:
      'The HTML <strong> element defines text with strong importance.',
  },
  {
    title: 'Handlebars',
    blogger: 'Vlad Sokolovsky',
    post_date: 'December 24, 2020',
    topic_id: 4,
    content:
      'Handlebars compiles templates into JavaScript functions. This makes the template execution faster than most other template engines.',
  },
  {
    title: 'ExpressJS',
    blogger: 'Smit',
    post_date: 'January 20, 2018',
    topic_id: 4,
    content:
      'Some popular template engines that work with Express are Pug, Mustache, and EJS.',
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
