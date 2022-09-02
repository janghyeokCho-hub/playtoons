import React from 'react';
import styled from "styled-components";
import {getResizedNumber} from '@/common/common';

const defaultDesignSize = 1920;
const navWidth = 300;     //nav 넓이
const ratio1820 = 0.9;
const ratio1720 = 0.8;
const ratio1620 = 0.7;
const ratio1520 = 0.6;
const ratio1420 = 0.5;
const ratio1320 = 0.4;
const ratio1220 = 0.18;
const ratio1080 = 0.1;
const ratio980 = 0.05;

export default function ResponsiveDiv(props) {
  return (
    <Container {...props} />
  )
}

const Container = styled.div`
  width:            ${(props) => props.width};
  height:           ${(props) => props.height};
  padding-top:      ${(props) => props.paddingTop};
  padding-right:    ${(props) => props.paddingRight};
  padding-bottom:   ${(props) => props.paddingBottom};
  padding-left:     ${(props) => props.paddingLeft};
  margin-top:       ${(props) => props.marginTop};
  margin-right:     ${(props) => props.marginRight};
  margin-bottom:    ${(props) => props.marginBottom};
  margin-left:      ${(props) => props.marginLeft};
  font-size:        ${(props) => props.fontSize};
  
  //(1820-navWidth)/defaultDesignSize
  @media only screen and (max-width: 1820px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1820)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1820)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1820)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1820)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1820)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1820)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1820)};
  }

  @media only screen and (max-width: 1720px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1720)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1720)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1720)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1720)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1720)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1720)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1720)};
    
  }
  
  @media only screen and (max-width: 1620px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1620)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1620)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1620)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1620)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1620)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1620)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1620)};
    
  }
  
  @media only screen and (max-width: 1520px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1520)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1520)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1520)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1520)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1520)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1520)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1520)};
    
  }
  
  //계산으로 무리
  @media only screen and (max-width: 1420px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1420)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1420)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1420)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1420)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1420)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1420)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1420)};
    
  }
  
  @media only screen and (max-width: 1320px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1320)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1320)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1320)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1320)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1320)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1320)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1320)};
    
  }
  
  
  @media only screen and (max-width: 1220px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1220)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1220)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1220)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1220)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1220)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1220)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1220)};
    
  }
  
  
  @media only screen and (max-width: 1080px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio1080)};
    height:           ${(props) => getResizedNumber(props.height        , ratio1080)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio1080)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio1080)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio1080)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio1080)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio1080)};
  }
  
  
  @media only screen and (max-width: 980px) {
    width:            ${(props) => getResizedNumber(props.width         , ratio980)};
    height:           ${(props) => getResizedNumber(props.height        , ratio980)};
    padding-right:    ${(props) => getResizedNumber(props.paddingRight  , ratio980)};
    padding-left:     ${(props) => getResizedNumber(props.paddingLeft   , ratio980)};
    margin-right:     ${(props) => getResizedNumber(props.marginRight   , ratio980)};
    margin-left:      ${(props) => getResizedNumber(props.marginLeft    , ratio980)};
    font-size:        ${(props) => getResizedNumber(props.fontSize      , ratio980)};
  }
  
  
`;