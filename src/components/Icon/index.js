/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';
// import { Container } from './styles';

export default function Icon({ iconName }) {
  let icon;
  switch (iconName) {
    case 'c':
      icon = require('../../assets/Images/c.png');
      break;

    case 'h':
      icon = require('../../assets/Images/h.png');
      break;

    case 'hc':
      icon = require('../../assets/Images/hc.png');
      break;

    case 'hr':
      icon = require('../../assets/Images/hr.png');
      break;

    case 'lc':
      icon = require('../../assets/Images/lc.png');
      break;

    case 'lr':
      icon = require('../../assets/Images/lr.png');
      break;

    case 's':
      icon = require('../../assets/Images/s.png');
      break;

    case 'sl':
      icon = require('../../assets/Images/sl.png');
      break;

    case 'sn':
      icon = require('../../assets/Images/sn.png');
      break;

    case 't':
      icon = require('../../assets/Images/t.png');
      break;

    default:
      return false;
  }

  return <Image style={{ width: 30, height: 30 }} source={icon} />;
}
