import { getStringOfPrice } from '@/common/common';
import Image from '@/components/dashboard/Image';
import { setPaymentPlanItemAction } from '@/modules/redux/ducks/payment';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PlanItem(props) {
  const { item } = props;
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const dispatch = useDispatch();

  const handleClickLink = useCallback(() => {
    dispatch( setPaymentPlanItemAction({plan: item, author: currentAuthor}) );
  }, [item]);

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
        <Link to={`/payment/plan/${item.id}`} className="btn-pk b blue w100p" onClick={handleClickLink}>
          <span>応援する</span>
        </Link>
      </div>
    </div>
  );
}
