import React, { useRef, useEffect,  } from "react";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";
import Tag from "@/components/dashboard/Tag";
import { getFromDataJson } from "@/common/common";
import { getAuthorIdFromServer, getFileUrlFromServer, setAuthorIdToServer, setFileToServer } from "@/services/dashboardService";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "@/components/Modal";



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
	const [ stateAuthorInfo, setStateAuthorInfo ] = useState(undefined);
	const myAuthors = useSelector( ({post}) => post?.authorMine?.authors );
	const refBackground = useRef();
	const refProfile = useRef();
	const refTags = useRef();
	const refForm = useRef();
	const refR19 = useRef();

	//==============================================================================
	// function
	//==============================================================================
	const callbackProfileImage = () => {
		console.log('callbackProfileImage');
		
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
		console.log('callbackBackgroundImage');
		setAuthor();
	};


	const getRating = () => {
    return refR19.current.checked ? 'R-18' : 'G';
  };

	//==============================================================================
	// api
	//==============================================================================

	const getFileUrl = async (hash) => {
		const {status, data} = await getFileUrlFromServer(hash);
		console.log('getFileUrl', status, data);
		
		if( status === 200 ){
			return data?.url;
		}
		else{
			console.log('Error : ', status, data);
		}
	};

	const getAuthor = async () => {
		
		const {status, data} = await getAuthorIdFromServer(myAuthors[0].id);
		console.log('getAuthor', status, data);
		
		if( status === 200 ){
			setStateAuthorInfo( data?.author );

			const profile = await getFileUrl(data?.author?.profileImage);
			const background = await getFileUrl(data?.author?.backgroundImage);
			setStateAuthorInfo({
				...stateAuthorInfo,
				profileImagePreview: profile,
				backgroundImagePreview: background
			});
		}
		else{
			// refModal.current.setContent('Error : '+status);
			console.log('Error : ', status, data);
		}
		
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
		params.append("authorId", myAuthors[0].id);               
		params.append("subscribeTierId", "");        
		params.append("productId", "");
		params.append("type", "image");                 //image, video, binary
		params.append("usage", usage);                //profile, background, cover, logo, post, product, thumbnail, attachment
		params.append("loginRequired", false);          //언제 체크해서 보내는건지?
		params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
		params.append("rating", getRating());                   //G, PG-13, R-15, R-17, R-18, R-18G
		params.append("file", ref.current.getImageFile());
		
		console.log("set file params", params);

		const {status, data: resultData} = await setFileToServer(params);
		console.log("setFile result", status, resultData);
		
		//create sccuess
		if( status === 201 ){
			//ImageUpload component hash가 state 비동기적으로 저장된 뒤 props로 정의해둔 callback이 실행됨
			ref.current.setImageValueToInputTag(resultData?.hash);
		}
		else{
			//error 처리
			console.log('Error : ', status, resultData);
		}
	};

	const setAuthor = async () => {
		const id = myAuthors[0].id;
		let json = getFromDataJson(refForm);
		console.log('setAccounts', json, id);
		const {status, data} = await setAuthorIdToServer(id, json);
		console.log('setAccounts', status, data);
		
		if( status === 200 ){
			if( window.confirm('profile 変更しました。') ){
        getAuthor();
      }
		}
		else{
			
		}
	};

	//==============================================================================
	// event & Hook & render
	//==============================================================================
  
	const handleClickRegister = (event) => {
		console.log('Register', event);
		
		//profile 이미지 업로드, background 업로드, author 업로드
    //upload 할 이미지가 없다면 
    if( refProfile.current.getImageFile() === undefined ){
      callbackProfileImage();
    }
    else{
      //이미지 업로드 후 image hash 저장
      setImageToServer(refProfile, 'profile');
    }
	};

  useEffect(() => {
		//chekc author
		if( myAuthors === undefined || myAuthors === null || myAuthors.length === 0 ){
			alert('クリエーターじゃないんです。');
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
							preview={stateAuthorInfo?.backgroundImagePreview}
							id={"filebox1"}
							                
							/>

						<ImageUpload
							className={"profile_file"}
							preview={stateAuthorInfo?.profileImagePreview}
							id={"filebox2"}
							
							/>
					</div>

					<form ref={refForm}>
						<section className="bbs_write">
							<div className="col">
								<h3 className="tit1">{text.nickname}</h3>
								<input type="text" name='nickname' className="inp_txt w100p" value={stateAuthorInfo?.nickname}/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.name}</h3>
								<input type="text" name='name' className="inp_txt w100p" value={stateAuthorInfo?.name}/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.introduction}</h3>
								<textarea name="description" id="" className="textarea1" value={stateAuthorInfo?.description}></textarea>
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
									preview={stateAuthorInfo?.profileImagePreview}
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
									preview={stateAuthorInfo?.backgroundImagePreview}
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
									list={stateAuthorInfo?.tags}
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

		
			{/* <Modal ref={refModal} /> */}
    </Container>
    
  );
}

