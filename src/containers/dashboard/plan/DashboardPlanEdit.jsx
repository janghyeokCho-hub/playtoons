import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";


const text = {
  add_plan: "支援を追加",
  product_name: "商品名",
  summary: "説明",
  image: "イメージ",
  drag_drop: "ドラッグ＆ドロップ",
  setting_age: "年齢設定",
  r_19: "R-19",
  price: "価格",
  register: "登録する",
  description_next_month: "既存支援者には翌月から反映されます。"
};



export default function DashboardPlanEdit(props) {
  const [stateData, setStateData] = useState(undefined);

  const handleClickRegister = (event) => {
    console.log('Register', event);
    
  };

  useEffect(() => {
    
  }, []);

  return (
    <Container 
      type={"sub series bg moty1"}
      backTitle={text.add_plan} >
      
      <div className="inr-c">
        <div className="box_area">
          
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.add_plan}</h2>
            </div>

            <div className="col">
              <h3 className="tit1">{text.product_name}</h3>
              <input type="text" className="inp_txt w100p" />
            </div>

            <div className="col">
              <h3 className="tit1">{text.summary}</h3>
              <textarea name="" id="" className="textarea1"></textarea>
            </div>

            <div className="col">
              <h3 className="tit1">{text.image}</h3>
              <ImageUpload 
                // ref={refCoverImage}
                className={"box_drag half"}
                // preview={imageUrl}
                id={"filebox1"}
                name={"image"}                     
                text={text.drag_drop}    
                />
            </div>

            <div className="col">
              <h3 className="tit1">{text.setting_age} <span>（{text.description_next_month}）</span></h3>
              <label className="inp_chktx"><input type="checkbox" /><span>{text.r_19}</span></label>
            </div>

            <div className="col">
              <h3 className="tit1">{text.price} <span>（{text.description_next_month}）</span></h3>
              <div className="inp_txt sch">
                <input type="text" className="" />
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
