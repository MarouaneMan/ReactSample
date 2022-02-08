// !! IMPORTANT : DO NOT USE ES6 MODULES !!
//
// ALL FUNCTIONS / STATEMENTS BELOW WILL BE EVALUATED AT COMPILE TIME
// DO NOT USE WINDOW / NAVIGATOR... OBJECTS

const css = require('styled-components/css');

const isTV = process.env.REACT_APP_BUILD_TARGET.trim() === 'tv';

const size = {
    mobileSmall : 670,
    mobile      : 824,
    tablet      : 1024,
    desktopSmall: 1300
};

const landscape = (landscapeCss) => css`
  @media (orientation: landscape) {
    ${() => landscapeCss}
  }
`;

const mobile = (mobileCss) => css`
  @media (max-width: ${size.mobile}px) and (orientation: landscape) {
    ${() => mobileCss}
  }
`;

const mobileSmall = (mobileCss) => css`
  @media (max-width: ${size.mobileSmall}px) and (orientation: landscape) {
    ${() => mobileCss}
  }
`;

const tablet = (tabletCss) => css`
  @media (max-width: ${size.tablet}px) {
    ${() => tabletCss}
  }
`;

const desktopSmall = (desktopCss) => css`
  @media (max-width: ${size.desktopSmall}px) {
    ${() => desktopCss}
  }
`;

const tv = (tvCss) => {
    return isTV ? tvCss : null;
};

const hover = (hoverCss) => css`
  @media (hover: hover) {
    ${() => hoverCss}
  }
`;

module.exports = {
    isTV        : isTV,
    landscape   : landscape,
    mobile      : mobile,
    mobileSmall : mobileSmall,
    tablet      : tablet,
    desktopSmall: desktopSmall,
    hover       : hover,
    tv          : tv,
};
