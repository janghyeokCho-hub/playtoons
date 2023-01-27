import React from 'react'

export default function Coupon(props) {
  const { className = "area_payment hidden" } = props;


  return (
    <div className={className}>
      <h2 className="tit1">クーポン使用</h2>
      <div className="col">
        <h3 className="tit2">クーポン選択</h3>
        <select name="" id="" className="select1 w100p">
          <option value="">選択してください</option>
        </select>
      </div>
      <div className="col">
        <h3 className="tit2">クーポンコードを入力</h3>
        <div className="inp_btn">
          <input type="text" className="inp_txt w100p"/>
          <button type="button" className="btn-pk n blue2">適用する</button>
        </div>
      </div>
    </div>
  )
}
