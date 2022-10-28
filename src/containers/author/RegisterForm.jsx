import React, { useRef, useLayoutEffect,  } from "react";

import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";
import Tag from "@/components/dashboard/Tag";
import { getErrorMessageFromResultCode, getFromDataJson, getRatingToChecked, initButtonInStatus } from "@/common/common";
import {  setAuthorToServer, setFileToServer } from "@/services/dashboardService";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import { useNavigate } from "react-router-dom";
import { getEulaVersion } from "@/services/accountService";
import { useState } from "react";
import Button from "@/components/dashboard/Button";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { useDispatch } from "react-redux";




const text = {
	register_creator: 'クリエイター登録',
  nickname: "ニックネーム",
  name: "名前",
  introduction: "クリエイターの説明",
  register_profile_image: "プロフィル写真登録",
  register_cover_image: "カバー写真登録",
  setting_age: "年齢設定",
  setting_tag: "タグ設定",
  tag_name: "タグ名",
  description_policy: "当サイトでは、直近５年間の長崎県公報の全文を掲載しています。",
  register: "登録する",
  drag_n_drop: "ドラッグ＆ドロップ",
	r_19: "R-19"
};


export default function RegisterForm(props) {
	const [stateAgreement, setStateAgreement] = useState(undefined);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const refForm = useRef();
	const refNickname = useRef();
	const refName = useRef();
	const refDescription = useRef();
	const refProfile = useRef();
	const refBackground = useRef();
	const refR19 = useRef();
	const refTags = useRef();
	const refRegister = useRef();

	//==============================================================================
	// function
	//==============================================================================
	const callbackProfileImage = () => {
		//profile 이미지 업로드, background 업로드, author 업로드
    //upload 할 이미지가 없다면 
    if( refBackground.current.getImageFile() === undefined ){
      callbackBackgroundImage();
    }
    else{
      //이미지 업로드 후 image hash 저장 
      setImage(refBackground, 'background');
    }
	};

	const callbackBackgroundImage = () => {
		setAuthor();
	};

	//==============================================================================
	// api
	//==============================================================================

	const getAgreementInfo = async () => {
		const {status, data} = await getEulaVersion("author");
		console.log('getAgreementInfor', status, data);
		
		if( status === 200 ){
			setStateAgreement(data?.agreement);
		}
		else{
			dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, 
          }
        )
      );
		}
	};

	const setImage = async(ref, usage) => {
		// 폼데이터 구성
		const params = new FormData();
		// params.append("authorId", '');               
		// params.append("subscribeTierId", "");        
		// params.append("productId", "");
		params.append("type", "image");             					    //image, video, binary
		params.append("usage", usage);              						  //profile, background, cover, logo, post, product, thumbnail, attachment
		params.append("loginRequired", false);        					  //언제 체크해서 보내는건지?
		params.append("licenseRequired", false);        					//product 에 관련된 항목 추후 확인 필요
		params.append("rating", getRatingToChecked(refR19));                   //G, PG-13, R-15, R-17, R-18, R-18G
		params.append("file", ref.current.getImageFile());
		
		const {status, data: resultData} = await setFileToServer(params);
		if( status === 201 ){
			//ImageUpload component hash가 state 비동기적으로 저장된 뒤 props로 정의해둔 callback이 실행됨
			ref.current.setImageValueToInputTag(resultData?.hash);
		}
		else{
			//error 처리
			initButtonInStatus(refRegister);
			ref.current.setError( String(status + resultData) );
		}
	};

	const setAuthor = async () => {
		let json = getFromDataJson(refForm);

		json = {
			...json,
			tagIds: refTags.current.getTagsJsonObject(),
			eulaVersion: stateAgreement?.version
		};

		const {status, data} = await setAuthorToServer(json);
		if( status === 201 ){
			dispatch(
        showModal(
          {
            title: text.error_title, 
            contents: <ErrorPopup message={'クリエイター登録しました。'} buttonTitle={'確認'} />, 
            callback: ()=> {navigate(`/dashboard/profile/upload`)}
          }
        )
      );
		}
		else{
			//error 
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
	// event & 
	//==============================================================================
  
	const handleClickRegister = (event) => {
		if( refNickname.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refNickname.current.setError( 'ニックネームが必要です。' );
			return;
		}

		if( refName.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refName.current.setError( '名前が必要です。' );
			return;
		}

		if( refDescription.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refDescription.current.setError( '紹介が必要です。' );
			return;
		}

		if( refProfile.current.checkToEmpty() ){
			initButtonInStatus(refRegister);
      refProfile.current.setError('プロフィル写真が必要です。');
      return false;
    }

		if( refBackground.current.checkToEmpty() ){
			initButtonInStatus(refRegister);
      refBackground.current.setError('カバー写真が必要です。');
      return false;
    }
		
		// profile 이미지 업로드, background 업로드, author 업로드
    // upload 할 이미지가 없다면 
    if( refProfile.current.getImageFile() === undefined ){
      callbackProfileImage();
    }
    else{
      //이미지 업로드 후 image hash 저장
      setImage(refProfile, 'profile');
    }
	};

	//==============================================================================
	// Hook & render
	//==============================================================================

  useLayoutEffect(() => {
		//get eulaVersion
		getAgreementInfo();
  }, []);

  return (
    <div className="container sub mpost bg" style={{padding: '55px 16px'}}>

				<div className="inr-c">
					<div className="hd_titbox hd_mst1">
						<h2 className="h_tit1"><span>{text.register_creator}</span></h2>
					</div>

					<form ref={refForm}>
						<section className="bbs_write">
							<div className="col" >
								<h3 className="tit1">{text.nickname}</h3>
								<Input ref={refNickname} type="text" name='nickname' className="inp_txt w100p"/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.name}</h3>
								<Input ref={refName} type="text" name='name' className="inp_txt w100p"/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.introduction}</h3>
								<Textarea ref={refDescription} name="description" className="textarea1"/>
							</div>


							<div className="col">
								<h3 className="tit1">{text.register_profile_image} <button type="button" className="btn_help" title="ヘルプ">
									<ToolTip
										title={text.register_profile_image}
										text={"teadaf"} />
								</button></h3>
								<ImageUpload
									ref={refProfile}
									className={"box_drag square"}
									id={"filebox1"}
									name={"profileImage"} 
									callback={callbackProfileImage}
									/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.register_cover_image}</h3>
								<ImageUpload
									ref={refBackground}
									className={"box_drag"}
									id={"filebox2"}
									name={"backgroundImage"} 
									text={text.drag_n_drop}
									callback={callbackBackgroundImage}
									/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.setting_age}</h3>
								<label className="inp_chktx"><input type="checkbox" ref={refR19} /><span>{text.r_19}</span></label>
							</div>

							<div className="col">
								<h3 className="tit1">{text.setting_tag} <button type="button" className="btn_help" title="ヘルプ">
									<ToolTip
										title={text.setting_tag}
										text={'タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。'} />
									</button>
								</h3>
								<Tag 
									ref={refTags}
									name={"tagIds"}
									className={"inp_txt sch"}
									placeholder={text.tag_name} />
							</div>

							<div className="col">
								<p className="t_info">{text.description_policy}<br className="view-m" /></p>
							</div>
						</section>
					</form>

					<div className="bbs_write_botm">
						<Button ref={refRegister} className={'btn-pk n blue'} text={text.register} onClick={handleClickRegister} />
					</div>
					
				</div>
    </div>
    
  );
}

