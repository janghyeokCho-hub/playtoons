import React, { useRef, useEffect,  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

import Container from "@/components/dashboard/Container";
import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";



const text = {
  profile_management: "プロフィル管理",
  nickname: "ニックネーム",
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
	const refBackground = useRef();
	const refProfile = useRef();
  

  useEffect(() => {

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
						ref={refBackground}
						className={"bg_file"}
						// preview={imageUrl}
						id={"filebox1"}
						name={"profileBackgroundImage"}                     
						/>

					<ImageUpload
						ref={refProfile}
						className={"profile_file"}
						// preview={imageUrl}
						id={"filebox2"}
						name={"profileImage"} 
						/>
				</div>


				<section className="bbs_write">
					<div className="col">
						<h3 className="tit1">{text.nickname}</h3>
						<input type="text" className="inp_txt w100p" />
					</div>

					<div className="col">
						<h3 className="tit1">{text.introduction}</h3>
						<textarea name="" id="" className="textarea1"></textarea>
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
							// preview={imageUrl}
							id={"filebox1"}
							name={"profileImage"} 
							/>
					</div>

					<div className="col">
						<h3 className="tit1">{text.register_cover_image}</h3>
						<ImageUpload
							ref={refProfile}
							className={"box_drag"}
							// preview={imageUrl}
							id={"filebox1"}
							name={"profileImage"} 
							text={text.drag_n_drop}
							/>
					</div>

					<div className="col">
						<h3 className="tit1">{text.setting_age}</h3>
						<label className="inp_chktx"><input type="checkbox" defaultChecked /><span>{text.r_19}</span></label>
					</div>

					<div className="col">
						<h3 className="tit1">{text.setting_tag}</h3>
						<div className="inp_txt sch">
							<button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
							<input type="text" className="" placeholder={text.tag_name} />
						</div>
					</div>

					<div className="col">
						<p className="t_info">{text.description_policy}<br className="view-m" /></p>
						{/* <p className="t_info">当サイトでは、直近５年間の長崎県公報の<br className="view-m" />全文を掲載しています。</p> */}
					</div>
				</section>

				<div className="bbs_write_botm">
					<a href="#" className="btn-pk n blue"><span>{text.register}</span></a>
				</div>
			
			</div>
		</div>


    </Container>
    
  );
}

