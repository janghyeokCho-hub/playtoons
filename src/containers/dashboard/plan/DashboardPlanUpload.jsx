import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { useRef } from "react";


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
};



export default function DashboardPlanUpload(props) {
  const [stateData, setStateData] = useState(undefined);
  const refPrice = useRef();

  const handleFocusPrice = (event) => {
    refPrice.current.classList.add("input_focus");
  };
  
  const handleBlurPrice = (event) => {
    refPrice.current.classList.remove("input_focus");
  };

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
              <h3 className="tit1">{text.setting_age}</h3>
              <label className="inp_chktx"><input type="checkbox" /><span>{text.r_19}</span></label>
            </div>

            <div className="col">
              <h3 className="tit1">{text.price}</h3>
              <div className="inp_txt sch" ref={refPrice}>
                <input type="text" className="" onFocus={handleFocusPrice}  onBlur={handleBlurPrice} />
                <span className="won">PC</span>
              </div>
            </div>

          </section>

          <div id="btnReg" className="bbs_write_botm" onClick={handleClickRegister}>
            <a href="#btnReg" className="btn-pk n blue"><span>{text.register}</span></a>
          </div>
        
        </div>
      </div>

    </Container>
  );
}
