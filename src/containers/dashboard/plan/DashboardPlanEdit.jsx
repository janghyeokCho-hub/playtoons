import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";

import tempPlanImage1 from "@IMAGES/img_mainplan1.jpg";

const text = {
  edit_plan: "支援を編集する",
  product_name: "商品名",
  summary: "説明",
  image: "イメージ",
  drag_drop: "ドラッグ＆ドロップ",
  setting_age: "年齢設定",
  r_19: "R-19",
  price: "価格",
  register: "登録する",
  description_next_month: "(既存支援者には翌月から反映されます。)"
};


const tempData = {
  result: 0,
  plan: {
    id: "1",
    image: tempPlanImage1,
    title: "ダイヤモンドプラン",
    money: "1,000",
    description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
    rating: "R-19",
    benefits : [
      {
        text : "・差分が見れます"
      },
      {
        text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
      },
    ]
  },
};


export default function DashboardPlanEdit(props) {
  const [stateData, setStateData] = useState(undefined);

  const getRatingChecked = () => {
    console.log('getRatingChecked');
    return stateData?.rating === "G" ? true : false; 
  };

  const handleClickRegister = (event) => {
    console.log('Register', event);
    
  };

  useEffect(() => {
    setStateData(tempData.plan);
  }, []);

  return (
    <Container 
      type={"sub series bg moty1"}
      backTitle={text.edit_plan} >
      
      <div className="inr-c">
        <div className="box_area">
          
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.edit_plan}</h2>
            </div>

            <div className="col">
              <h3 className="tit1">{text.product_name}</h3>
              <input type="text" className="inp_txt w100p" defaultValue={stateData?.title} />
            </div>

            <div className="col">
              <h3 className="tit1">{text.summary}</h3>
              <textarea name="" id="" className="textarea1" defaultValue={stateData?.description}></textarea>
            </div>

            <div className="col">
              <h3 className="tit1">{text.image}</h3>
              <ImageUpload 
                // ref={refCoverImage}
                className={"box_drag half"}
                preview={stateData?.image}
                id={"filebox1"}
                name={"image"}                     
                text={text.drag_drop}    
                />
            </div>

            <div className="col">
              <h3 className="tit1">{text.setting_age} <span className="plan_desc" >{text.description_next_month}</span></h3>
              <label className="inp_chktx"><input type="checkbox" defaultChecked={getRatingChecked} /><span>{text.r_19}</span></label>
            </div>

            <div className="col">
              <h3 className="tit1">{text.price} <span className="plan_desc" >{text.description_next_month}</span></h3>
              <div className="inp_txt sch">
                <input type="text" className="" defaultValue={stateData?.money} />
                <span className="won">PC</span>
              </div>
            </div>

          </section>

          <div id="btn" className="bbs_write_botm" onClick={handleClickRegister}>
            <a href="#btn" className="btn-pk n blue"><span>{text.register}</span></a>
          </div>
        
        </div>
      </div>

    </Container>
  );
}
