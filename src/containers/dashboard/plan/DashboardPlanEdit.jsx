import React, { useEffect, useState, } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { editSubscribeTierToServer, setFileToServer } from "@/services/dashboardService";
import { getErrorMessageFromResultCode, getFromDataJson, getRatingToChecked, initButtonInStatus } from "@/common/common";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import Price from "@/components/dashboard/Price";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import Button from "@/components/dashboard/Button";

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
  description_next_month: "(既存支援者には翌月から反映されます。)",
  please_input_image: 'イメージを入力してください。',
  please_input_product_name: '商品名を入力してください。',
  please_input_description: '説明を入力してください。',
  please_input_price: '価格を入力してください。',
  error_title: 'お知らせ',
};

export default function DashboardPlanEdit(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSubscribeTiers = useSelector(({dashboard}) => dashboard?.subscribeTiers);
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const params = useParams('id');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refForm = useRef();
  const refProductName = useRef();
  const refDescription = useRef();
  const refImage = useRef();
  const refRating = useRef();
  const refPrice = useRef();
  const refRegister = useRef();

  //==============================================================================
  // function
  //==============================================================================
  const setChckecToRating = () => {
    return stateData?.rating === "G" ? true : false; 
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
    params.append("rating", getRatingToChecked(refRating));                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", ref.current.getImageFile());
    
    const {status, data: resultData} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      ref.current.setImageValueToInputTag(resultData?.hash);
    }
    else{
      //error 처리
      initButtonInStatus(refRegister);
      ref.current.setError(status + resultData);
    }
  };

  const updateSubscribeTier = async () => {

    //필드 확인 
    if( refProductName.current.isEmpty() ){
      initButtonInStatus(refRegister);
			refProductName.current.setError( text.please_input_product_name );
			return;
		}
    if( refDescription.current.isEmpty() ){
      initButtonInStatus(refRegister);
			refDescription.current.setError( text.please_input_description );
			return;
		}
    if( refImage.current.checkToEmpty() ){
      initButtonInStatus(refRegister);
      refImage.current.setError( text.please_input_image );
      return false;
    }
    if( refPrice.current.isEmpty() ){
      initButtonInStatus(refRegister);
			refPrice.current.setError( text.please_input_price );
			return;
		}

    let json = getFromDataJson(refForm);
		json = {
			...json,
      price: parseInt( json.price ),
			subscribeTierId: params.id,
		};
    if( !json.thumbnailImage.length ){
      json = {
        ...json,
        thumbnailImage: stateData.thumbnailImage,
      };
    }

    const {status, data} = await editSubscribeTierToServer(json);
    console.log('updateSubscribeTier', status, data);
    
    if( status === 200 ){
      dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={'支援を編集しました。'} buttonTitle={'確認'} />, 
            callback: ()=> {navigate(`/dashboard/plan`)}
          }
        )
      );
    }
    else{
      //error 처리
      dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, 
          }
        )
      );
    }

    initButtonInStatus(refRegister);
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
                <Input ref={refProductName} type="text" name='name' className="inp_txt w100p" defaultValue={stateData?.name} />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea ref={refDescription} name='description' className="textarea1" defaultValue={stateData?.description}></Textarea>
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
                <Price ref={refPrice} type="text" className="" name='price' defaultValue={stateData?.price}  />
              </div>
            </form>
          </section>

          <div id="btn" className="bbs_write_botm">
            <Button ref={refRegister} className={'btn-pk n blue'} text={text.register} onClick={handleClickRegister} />
          </div>
        
        </div>
      </div>

    </Container>
  );
}
