import { getStringOfPrice } from '@/common/common';
import Image from '@/components/dashboard/Image';
import React from 'react'
import { Link } from 'react-router-dom';

export default function PlanItem(props) {
  const { item } = props;
  

  return (
    <div className="col" style={{ marginBottom: "2.33%" }}>
      <div className="icon">
        <Image hash={item.thumbnailImage} />
      </div>
      <div className="cont">
        <h3 className="h1">{item?.name}</h3>
        <p className="t1">
          <span className="c-blue">{getStringOfPrice(item?.price)}</span> /月
        </p>
        <p className="t2">{item?.description}</p>
        <div className="t_dot1">
          {/* <p>・差分が見れます</p>
          <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p> */}
        </div>
        <Link to={`/payment/plan/${item.id}`} className="btn-pk b blue w100p">
          <span>応援する</span>
        </Link>
      </div>
    </div>
  );
}
