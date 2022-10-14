import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { useRef } from "react";
import { getFromDataJson } from "@/common/common";
import { setFileToServer, setSubscribeTierToServer } from "@/services/dashboardService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


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
  const myAuthors = useSelector( ({post}) => post?.authorMine?.authors );
  const navigate = useNavigate();
  const refPriceContainer = useRef();
  const refPrice = useRef();
  const refForm = useRef();
  const refThumbnailImage = useRef();
  const refRating = useRef();

  //==============================================================================
  // function 
  //==============================================================================
  const callbackThumbnailImage = () => {
    console.log('callbackThumbnailImage');
    setSubscribeTier();
  };

  //==============================================================================
  // api
  //==============================================================================
  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {file} 
  */
    const setImageToServer = async(ref, usage) => {
      // 폼데이터 구성
      const params = new FormData();
      params.append("authorId", "");               
      params.append("subscribeTierId", "");        
      params.append("productId", "");
      params.append("type", "image");                 //image, video, binary
      params.append("usage", usage);                //profile, background, cover, logo, post, product, thumbnail, attachment
      params.append("loginRequired", false);          //언제 체크해서 보내는건지?
      params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
      params.append("rating", refRating.current.checked ? 'R-18' : 'G');                   //G, PG-13, R-15, R-17, R-18, R-18G
      params.append("file", ref.current.getImageFile());
      
      console.log("set file params", params);
  
      const {status, data: resultData} = await setFileToServer(params);
      console.log("setFile result", status, resultData);
      
      //create sccuess
      if( status === 201 ){
        ref.current.setImageValueToInputTag(resultData?.hash);
      }
      else{
        //error 처리
        console.log('Error : ', status, resultData);
      }
    };

  const setSubscribeTier = async () => {
    let json = getFromDataJson(refForm);
    json = {
      ...json,
      tier: 0,
      authorId: myAuthors[0].id,
      status: 'enabled',
      price: parseInt(refPrice.current.value),
    };

    const {status, data} = await setSubscribeTierToServer(json);
    console.log('setSubscribeTier', status, data);
    
    if( status === 201 ){
      if( window.confirm('支援を追加しました。') ){
        navigate('/dashboard/plan');
      }
    }
    else{
      
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleFocusPrice = (event) => {
    refPriceContainer.current.classList.add("input_focus");
  };
  
  const handleBlurPrice = (event) => {
    refPriceContainer.current.classList.remove("input_focus");
  };

  const handleClickRegister = (event) => {
    console.log('Register', event);
    
    //cover 이미지 업로드, thumbnail 업로드, series 업로드
    //upload 할 이미지가 없다면 
    if( refThumbnailImage.current.getImageFile() === undefined ){
      callbackThumbnailImage();
    }
    else{
      //이미지 업로드 후 image url 
      setImageToServer(refThumbnailImage, 'thumbnail');
    }
  };

  //==============================================================================
  // render & hook
  //==============================================================================

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

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.product_name}</h3>
                <input type="text" name='name' className="inp_txt w100p" />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <textarea name="description" id="" className="textarea1"></textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.image}</h3>
                <ImageUpload 
                  ref={refThumbnailImage}
                  className={"box_drag half"}
                  // preview={imageUrl}
                  id={"filebox1"}
                  name={"thumbnailImage"}                     
                  text={text.drag_drop} 
                  callback={callbackThumbnailImage}   
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_age}</h3>
                <label className="inp_chktx"><input type="checkbox" ref={refRating} /><span>{text.r_19}</span></label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.price}</h3>
                <div className="inp_txt sch" ref={refPriceContainer}>
                  <input ref={refPrice} type="number" name='price' className="" onFocus={handleFocusPrice}  onBlur={handleBlurPrice} />
                  <span className="won">PC</span>
                </div>
              </div>
            </form>
          </section>

          <div id="btnReg" className="bbs_write_botm" onClick={handleClickRegister}>
            <a href="#btnReg" className="btn-pk n blue"><span>{text.register}</span></a>
          </div>
        
        </div>
      </div>

    </Container>
  );
}
