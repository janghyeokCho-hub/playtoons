import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";

import tempPlanImage1 from "@IMAGES/img_mainplan1.jpg";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { editSubscribeTierToServer, setFileToServer } from "@/services/dashboardService";
import { getFromDataJson } from "@/common/common";

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

export default function DashboardPlanEdit(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSubscribeTiers = useSelector(({dashboard}) => dashboard?.subscribeTiers);
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const params = useParams('id');
  const navigate = useNavigate();
  const refForm = useRef();
  const refImage = useRef();
  const refPriceContainer = useRef();
  const refRating = useRef();

  //==============================================================================
  // function
  //==============================================================================
  const setChckecToRating = () => {
    return stateData?.rating === "G" ? true : false; 
  };

  const getCheckedToRating = () => {
    return refRating.checked ? 'R-18' : 'G'; 
  };

  const findPlan = () => {
    for( let i = 0; i < reduxSubscribeTiers?.length; i++ ){
      if( reduxSubscribeTiers[i].id === params.id ){
        setStateData(reduxSubscribeTiers[i]);
        break;
      }
    }
  };

  const callbackImage = () => {
    updateSubscribeTier();
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
    params.append("authorId", reduxAuthors[0].id);               
    params.append("subscribeTierId", "");        
    params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", usage);                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false);          //언제 체크해서 보내는건지?
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getCheckedToRating());                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());
    
    const {status, data: resultData} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
      ref.current.setError(status);
    }
  };

  const updateSubscribeTier = async () => {
    let json = getFromDataJson(refForm);

    const price = parseInt( json.price );
		json = {
			...json,
      price: price,
			subscribeTierId: params.id,
		};

    console.log('updateSubscribeTier', json);
    const {status, data} = await editSubscribeTierToServer(json);
    console.log('updateSubscribeTier', status, data);
    
    if( status === 200 ){
      if( window.confirm('支援を編集しました。') ){
        navigate(params);
      }
    }
    else{
      //error 처리
      alert( String(status, data) );
    }
    
  };


  //==============================================================================
  // event
  //==============================================================================

  const handleClickRegister = (event) => {

    //thumbnail 업로드, plan update
    //upload 할 이미지가 없다면 
    if( refImage.current.getImageFile() === undefined ){
      callbackImage();
    }
    else{
      //이미지 업로드 후 image url 
      setImageToServer(refImage, 'cover');
    }
  };

  const handleFocus = (event) => {
    refPriceContainer.current.classList.add("input_focus");
  };
  
  const handleBlur = (event) => {
    refPriceContainer.current.classList.remove("input_focus");
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  useEffect(() => {
    findPlan();
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

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.product_name}</h3>
                <input type="text" name='name' className="inp_txt w100p" defaultValue={stateData?.name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <textarea name='description' className="textarea1" defaultValue={stateData?.description}></textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.image}</h3>
                <ImageUpload 
                  ref={refImage}
                  className={"box_drag half"}
                  previewHash={stateData?.thumbnailImage}
                  id={"filebox1"}
                  name={"thumbnailImage"}                     
                  text={text.drag_drop}    
                  callback={callbackImage}
                  />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_age} <span className="plan_desc" >{text.description_next_month}</span></h3>
                <label className="inp_chktx"><input ref={refRating} type="checkbox" defaultChecked={setChckecToRating} /><span>{text.r_19}</span></label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.price} <span className="plan_desc" >{text.description_next_month}</span></h3>
                <div ref={refPriceContainer} className="inp_txt sch">
                  <input type="number" className="" name='price' defaultValue={stateData?.price} onFocus={handleFocus} onBlur={handleBlur} />
                  <span className="won">PC</span>
                </div>
              </div>
            </form>
          </section>

          <div id="btn" className="bbs_write_botm" onClick={handleClickRegister}>
            <a href="#btn" className="btn-pk n blue"><span>{text.register}</span></a>
          </div>
        
        </div>
      </div>

    </Container>
  );
}
