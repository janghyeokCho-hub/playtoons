import React, { useRef, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

import Container from "@/components/dashboard/Container";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempImageBg from "@IMAGES/landingpage-profile-bgImg2.png";

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
  input_image: "置いてください。",
};

const typeDataList = ["1", "2", "3"];

export default function DashboardUploadProfile(props) {
  

  useEffect(() => {

  }, []);

  return (
    <Container 
    type={"bg profile"} >

    <div class="inr-c">
			<div class="box_area">
				<div class="hd_titbox hd_mst1">
					<h2 class="h_tit1"><span>シリーズリスト</span></h2>
				</div>
				
				<div class="top_profile">
					<div class="bg_file">
						<input type="file" id="filebox1" />
						<label for="filebox1" class="filetxt">
							<div class="ico"><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></div>
						</label>
						{/* <!-- 이미지 업로드시 
						<div class="fileview">
							<div style={{backgroundImage: `url(../images/tmp/tmp_comic2.jpg);`}}></div>
							<span class="f_tx">webtoon_shorts.jpg</span>
							<button type="button" class="btn_del" title="削除"><i class="fa-solid fa-trash-xmark"></i></button>
						</div>*/}
					</div>

					<div class="profile_file">
						<input type="file" id="filebox2" />
						<label for="filebox2" class="filetxt">
							<div class="ico"><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></div>
						</label>
						{/* <!-- 이미지 업로드시 
						<div class="fileview">
							<div style={{backgroundImage: `url(../images/tmp/tmp_comic2.jpg);`}}></div>
							<button type="button" class="btn_del" title="削除"><i class="fa-solid fa-circle-xmark"></i></button>
						</div>*/}
					</div>
				</div>


				<section class="bbs_write">
					<div class="col">
						<h3 class="tit1">ニックネーム</h3>
						<input type="text" class="inp_txt w100p" />
					</div>

					<div class="col">
						<h3 class="tit1">紹介</h3>
						<textarea name="" id="" class="textarea1"></textarea>
					</div>


					<div class="col">
						<h3 class="tit1">プロフィル写真登録 <button type="button" class="btn_help" title="ヘルプ"><FontAwesomeIcon icon="fa-solid fa-circle-info" /></button></h3>
						<div class="box_drag square">
							<input type="file" id="filebox1" />
							<label for="filebox1" class="filetxt">
								<div class="txt">
									<div class="ico"><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></div>
								</div>
							</label>
							<div class="fileview">
								<div><img src="../images/tmp/tmp_comic2.jpg" alt="" /></div>
								<button type="button" class="btn_del" title="削除"><i class="fa-solid fa-circle-xmark"></i></button>
							</div>
						</div>
					</div>

					<div class="col">
						<h3 class="tit1">カバー写真登録</h3>
						<div class="box_drag">
							<input type="file" id="filebox4" />
							<label for="filebox4" class="filetxt">
								<div class="txt">
									<div class="ico"><i class="fa-solid fa-circle-plus"></i><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></div>
									<p class="t">ドラッグ＆ドロップ</p>
								</div>
							</label>
							<div class="fileview">
								<div><img src="../images/tmp/tmp_comic2.jpg" alt="" /></div>
								<button type="button" class="btn_del" title="削除"><i class="fa-solid fa-circle-xmark"></i></button>
							</div>
						</div>
					</div>

					<div class="col">
						<h3 class="tit1">年齢設定</h3>
						<label class="inp_chktx"><input type="checkbox" checked /><span>R-19</span></label>
					</div>

					<div class="col">
						<h3 class="tit1">タグ設定</h3>
						<div class="inp_txt sch">
							<button type="button" class="btns" title="検索"><FontAwesomeIcon icon="fa-light fa-magnifying-glass" /></button>
							<input type="text" class="" placeholder="タグ名" />
						</div>
					</div>

					<div class="col">
						<p class="t_info">当サイトでは、直近５年間の長崎県公報の<br class="view-m" />全文を掲載しています。</p>
					</div>
				</section>

				<div class="bbs_write_botm">
					<a href="#" class="btn-pk n blue"><span>登録する</span></a>
				</div>
			
			</div>
		</div>


    </Container>
    
  );
}

