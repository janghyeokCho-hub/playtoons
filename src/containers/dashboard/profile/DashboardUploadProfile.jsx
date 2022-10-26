import React, { useRef, useEffect, useLayoutEffect,  } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";
import Tag from "@/components/dashboard/Tag";
import { getFromDataJson, getRatingToChecked } from "@/common/common";
import {  setAuthorIdToServer, setFileToServer } from "@/services/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorIdAction } from "@/modules/redux/ducks/dashboard";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import { getAuthorMineFromServer } from "@/services/postService";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { showModal } from "@/modules/redux/ducks/modal";



const text = {
  profile_management: "プロフィル管理",
  nickname: "ニックネーム",
  name: "名前",
  introduction: "紹介",
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


export default function DashboardUploadProfile(props) {
	const reduxAuthor = useSelector( ({dashboard}) => dashboard.author );
	const reduxAuthors = useSelector( ({post}) => post.authorMine.authors );
	const dispatch = useDispatch();
	const refNickname = useRef();
	const refName = useRef();
	const refDescription = useRef();
	const refBackground = useRef();
	const refProfile = useRef();
	const refTags = useRef();
	const refForm = useRef();
	const refR19 = useRef();

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
      setImageToServer(refBackground, 'background');
    }
	};

	const callbackBackgroundImage = () => {
		setAuthor();
	};

	//==============================================================================
	// api
	//==============================================================================

	const getAuthor = async () => {
		const params = {
			id: reduxAuthors[0].id
		};
		
		dispatch( getAuthorIdAction(params) );
	};

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
		params.append("rating", getRatingToChecked(refR19));                   //G, PG-13, R-15, R-17, R-18, R-18G
		params.append("file", ref.current.getImageFile());
		
		const {status, data: resultData} = await setFileToServer(params);
		if( status === 201 ){
			//ImageUpload component hash가 state 비동기적으로 저장된 뒤 props로 정의해둔 callback이 실행됨
			ref.current.setImageValueToInputTag(resultData?.hash);
		}
		else{
			//error 처리
			ref.current.setError( String(status, resultData) );
		}
	};
	

	const setAuthor = async () => {
		const id = reduxAuthors[0].id;
		let json = getFromDataJson(refForm);

		json = {
			...json,
			tagIds: refTags.current.getTagsJsonObject()
		};

		console.log('setAccounts', json, id);
		const {status, data} = await setAuthorIdToServer(id, json);
		
		if( status === 200 ){
			getAuthor();
			dispatch( showModal({title: 'お知らせ', contents: <ErrorPopup message={'profile 変更しました。'} buttonTitle={'確認'} />, }) );
		}
		else{
			//error 
			dispatch( showModal({title:'お知らせ', contents: <ErrorPopup message={ String(status + data) } buttonTitle={'確認'} />, }) );
		}
	};

	//==============================================================================
	// event & 
	//==============================================================================
  
	const handleClickRegister = (event) => {
		if( refNickname.current.isEmpty() ){
			refNickname.current.setError( 'ニックネームが必要です。' );
			return;
		}

		if( refName.current.isEmpty() ){
			refName.current.setError( '名前が必要です。' );
			return;
		}

		if( refDescription.current.isEmpty() ){
			refDescription.current.setError( '紹介が必要です。' );
			return;
		}

		if( refProfile.current.checkToEmpty() ){
      refProfile.current.setError('プロフィル写真が必要です。');
      return false;
    }

		if( refBackground.current.checkToEmpty() ){
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
      setImageToServer(refProfile, 'profile');
    }
	};

	//==============================================================================
	// Hook & render
	//==============================================================================

  useLayoutEffect(() => {
		//chekc author
		if( reduxAuthors === undefined || reduxAuthors === null || reduxAuthors.length === 0 ){
			dispatch( showModal({title:'お知らせ', contents: <ErrorPopup message={'クリエーターじゃないんです。'} buttonTitle={'確認'} />, }) );
		}
		else{
			//get accounts info
			getAuthor();
		}
  }, []);

	  return (
    <Container 
    type={"bg profile"} >

			<div className="inr-c">
				<div className="box_area">
					<div className="hd_titbox hd_mst1">
						<h2 className="h_tit1"><span>{text.profile_management}</span></h2>
					</div>
					
					<div className="top_profile">
						<ImageUpload
							className={"bg_file"}
							previewHash={reduxAuthor?.backgroundImage}
							id={"filebox1"}
							/>

						<ImageUpload
							className={"profile_file"}
							previewHash={reduxAuthor?.profileImage}
							id={"filebox2"}
							
							/>
					</div>

					<form ref={refForm}>
						<section className="bbs_write">
							<div className="col" >
								<h3 className="tit1">{text.nickname}</h3>
								<Input ref={refNickname} type="text" name='nickname' className="inp_txt w100p" defaultValue={reduxAuthor?.nickname}  />
							</div>

							<div className="col">
								<h3 className="tit1">{text.name}</h3>
								<Input ref={refName} type="text" name='name' className="inp_txt w100p" defaultValue={reduxAuthor?.name} />
							</div>

							<div className="col">
								<h3 className="tit1">{text.introduction}</h3>
								<Textarea ref={refDescription} name="description" className="textarea1" defaultValue={reduxAuthor?.description} />
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
									previewHash={reduxAuthor?.profileImage}
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
									previewHash={reduxAuthor?.backgroundImage}
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
								<h3 className="tit1">{text.setting_tag}</h3>
								<Tag 
									ref={refTags}
									name={"tagIds"}
									className={"inp_txt sch"}
									list={reduxAuthor?.tags}
									placeholder={text.tag_name} />
							</div>

							<div className="col">
								<p className="t_info">{text.description_policy}<br className="view-m" /></p>
							</div>
						</section>
					</form>

					<div className="bbs_write_botm">
						<div onClick={handleClickRegister} className="btn-pk n blue"><span>{text.register}</span></div>
					</div>
				
				</div>
			</div>

		
    </Container>
    
  );
}

