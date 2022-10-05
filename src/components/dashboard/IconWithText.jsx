import React, { useEffect, useRef, useState } from 'react';

//TODO delete test
import '@/css/test.css';
import temp1 from '@IMAGES/landingpage-profile1.png';
import temp2 from '@IMAGES/landingpage-profile2.png';
import temp3 from '@IMAGES/landingpage-profile3.png';
import temp4 from '@IMAGES/landingpage-profile4.png';
import temp5 from '@IMAGES/landingpage-profile5.png';
import temp6 from '@IMAGES/landingpage-profile6.png';
import temp7 from '@IMAGES/landingpage-profile7.png';
import temp8 from '@IMAGES/landingpage-profile8.png';
import tempTop1 from '@IMAGES/ico_twitter.png';
import tempTop2 from '@IMAGES/ico-animate.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCircleXmark, } from '@fortawesome/pro-solid-svg-icons';
import useOutSideClick from '@/common/useOutSideClick';


/**
*
   <IconWithText 
    text={{
      sing_in_to_post: text.sing_in_to_post,    //placeholder
      icon: text.icon,                          //icon button text
      register: text.register                   //register button text
    }}
    callback={handler}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function IconWithText(props, ref) {
  const { text, callback } = props;
  const [ stateIconData, setStateIconData ] = useState(undefined);
  const [ stateTopSelected, setStateTopSelected ] = useState(0);
  const [ stateShowIcon, setStateShowIcon ] = useState(false);
  const [ stateSelectedIcons, setStateSelectedIcons ] = useState([]);
  const refContaienr = useRef();

  const getMarginRightOfIcon = (index) => {
    let tempIndex = index + 1;
    return (tempIndex % 5) === 0 ? '' : 'mr16';
  };

  const handleClickItemDelete = (event) => {
    event.stopPropagation();
    const index = event.target.parentElement.getAttribute('data-id') === null ? event.target.getAttribute('data-id') : event.target.parentElement.getAttribute('data-id');
    const selectedItem = stateSelectedIcons[ index ];
    setStateSelectedIcons(
      stateSelectedIcons.filter(item => item.code !== selectedItem.code)
    );

    return false;
  };

  const handleClickItemTopIcon = (event) => {
    event.stopPropagation();
    const index = event.target.getAttribute('data-id');
    setStateTopSelected( index );
  };
  
  const handleClickItemIcon = (event) => {
    const index = event.target.getAttribute('data-id');
    const item = stateIconData?.topIcons[stateTopSelected]?.icons[index];
    setStateSelectedIcons([
      ...stateSelectedIcons,
      item
    ]);
  };

  const renderSelectedIconsElement = () => {
    return stateSelectedIcons?.map((item, index) => {
      return (
        <div className="relative mr16 icon_sel_wrap" key={index}>
          <FontAwesomeIcon className="icon_sel_del" icon={faCircleXmark}  data-id={index} onClick={handleClickItemDelete}  />
          <img src={item.image} alt="selected icon" />
        </div>
      );
    });
  };

  const renderTopIconElement = () => {
    return stateIconData?.topIcons?.map((item, index) => {
      return (
        <div className="icon_top" key={index} >
          <img src={item.image} alt="top icon" data-id={index} onClick={handleClickItemTopIcon} />
        </div>
      );
    });
  };

  const renderIconElement = () => {
    return stateIconData?.topIcons[stateTopSelected]?.icons?.map((item, index) => {
      return (
        <div className={`icon ${getMarginRightOfIcon(index)}`} key={index} >
          <img src={item.image} alt="icon" data-id={index} onClick={handleClickItemIcon}/>
        </div>
      );
    });
  };

  useOutSideClick(refContaienr, () => setStateShowIcon(false));

  //component did mount
  useEffect(() => {
    setStateIconData(tempData);
  }, []);
  

  return (
    <div className="conts relative" ref={refContaienr}>
      <div className="icon_textarea_container" >
        <textarea name="" id="" className="icon_textarea" placeholder={text.sing_in_to_post}></textarea>
        {
          stateSelectedIcons.length !== 0 &&
          <div className="flex mt27">
            {
              renderSelectedIconsElement()
            }
          </div>
        }
      </div>
      <div className="btns">
        <button type="button" className="btn-pk s gray" onClick={() => setStateShowIcon(prev => !prev)}><span>{text.icon}</span></button>
        <button type="button" className="btn-pk s blue" onClick={callback} ><span>{text.register}</span></button>
      </div>

      {
        stateShowIcon && 
          <div className="icon_wrap">
            <div className="icon_top_container">
              <FontAwesomeIcon className="icon_arrow" icon={faAngleLeft} />
              <div className="ml34 mr34 flex">
                {
                  renderTopIconElement()
                }
              </div>
              <FontAwesomeIcon className="icon_arrow mla" icon={faAngleRight} />
            </div>
            <div className="icon_container">
                {
                  renderIconElement()
                }
            </div>

          </div>
      }
      
    </div>
  )
}

const tempData = {
  topIcons: [
    {
      image: tempTop1,
      icons: [
        {
          code: "icon1",
          image: temp1
        },
        {
          code: "icon2",
          image: temp2
        },
        {
          code: "icon3",
          image: temp3
        },
        {
          code: "icon4",
          image: temp4
        },
        {
          code: "icon5",
          image: temp5
        },
        {
          code: "icon6",
          image: temp6
        },
        {
          code: "icon7",
          image: temp7
        },
        {
          code: "icon8",
          image: temp8
        },
      ]
    },
    {
      image: tempTop2,
      icons: [
        {
          code: "icon11",
          image: temp8
        },
        {
          code: "icon21",
          image: temp7
        },
        {
          code: "icon31",
          image: temp6
        },
        {
          code: "icon41",
          image: temp5
        },
        {
          code: "icon51",
          image: temp4
        },
        {
          code: "icon61",
          image: temp3
        },
        {
          code: "icon71",
          image: temp2
        },
        {
          code: "icon81",
          image: temp1
        },
        {
          code: "icon91",
          image: temp1
        },
        {
          code: "icon101",
          image: temp2
        },
        {
          code: "icon111",
          image: temp3
        },
        {
          code: "icon121",
          image: temp4
        },
      ]
    },
  ],
};