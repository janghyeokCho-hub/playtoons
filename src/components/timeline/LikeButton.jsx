import useOutSideClick from '@/common/useOutSideClick';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export default function LikeButton(props) {
  const { item,  } = props;
  const [ stateIsShow, setIsShow ] = useState(false);
  const refEmoji = useRef();


  const handleLike = (event) => {
    setIsShow(!stateIsShow);
  };

  useOutSideClick(refEmoji, () => setIsShow(false));


  return (
    <>
      <button type="button" className="btn01" onClick={handleLike}>
        <FontAwesomeIcon icon={faHeart} /> {item?.likeCount}
      </button>
      {
        stateIsShow && (
          <div className="box_drop box_favorit" ref={refEmoji}>
            <ul>
              <li>
                <button type="button">
                  <span className="i_favorit1">{item?.likeCount}</span>
                </button>
              </li>
              <li>
                <button type="button">
                  <span className="i_favorit5">{item?.dislikeCount}</span>
                </button>
              </li>
            </ul>
          </div>
        )
      }
    </>
  )
}
