import React, { useRef, useEffect, useState, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";


import PostContainer from "@/components/post/PostContainer";
import ToolTip from "@/components/dashboard/ToolTip";
import Select from "@/components/dashboard/Select";
import ImageUploadContainer from "@/components/dashboard/ImageUploadContainer";



const text = {
  upload_post: "投稿する",
  post_edit: "投稿を修正",
  series: "シリーズ",
  type: "タイプ",
  category: "カテゴリ",
  title: "タイトル",
  episode: "話",
  contents: "コンテンツ",  
  tag: "タグ",
  support_user: "閲覧範囲（支援者）",  
  timeline: "タイムラインのサムネイル",
  drag_drop: "ドラッグ＆ドロップ",
  preview: "プレビュー",
  register: "登録する",

  tag_name: "タグ名",
  type_webtoon: "ウェブトゥーン",
  type_article: "アーティクル",
  type_movie: "映像",
  label_can_not_edit: "編集不可",
  input_image: "置いてください。",
};

const typeList = [
  {
    name : text.type_webtoon,
    code : "1",
    checked : true,
  },
  {
    name : text.type_article,
    code : "2",
    checked : false,
  },
  {
    name : text.type_movie,
    code : "3",
    checked : false,
  }
];

const categoryList = [
  {
    name : text.type_webtoon,
    code : "1",
    checked : true,
  },
  {
    name : text.type_article,
    code : "2",
    checked : false,
  },
  {
    name : text.type_movie,
    code : "3",
    checked : false,
  }
];

const supportorList = [
  {
    name : "閲覧範囲（支援者）",
    code : "1",
    checked : true,
  },
  {
    name : "2hyunkook",
    code : "2",
    checked : false,
  },
  {
    name : "yoon",
    code : "3",
    checked : false,
  }
];

export default function UploadPost(props) {
  const [stateTypeList, setStateTypeList] = useState(undefined);
  const [stateCategoryList, setStateCategoryList] = useState(undefined);
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const refContents = useRef();

  const getTypeListElements = () => {
    return stateTypeList?.map((item, index) => {
      return (
        <label class="inp_txchk"><input type="radio" name="type" defaultValue={item.code} defaultChecked={item.checked} /><span>{item.name}</span></label>
      );
    });
  };

  
  const handleClickItemCategory = (event) => {
    console.log('ItemCategory', event);
    
  };

  const handleClickPreview = (event) => {
    console.log('Preview', event);
    
  };
  
  const handleClickRegister = (event) => {
    console.log('Register', event);
    
  };
  
  useEffect(() => {
    //temp
    setStateTypeList(typeList);
    setStateCategoryList(categoryList);
    setStateSupportorList(supportorList);
  }, []);

  return (
    <PostContainer
      type={"sub post"}
      headerType={"post"}
      headerClassName={"ty1"} >

      <div class="inr-c">
        <div class="box_area bdn">
          
          <form action="">
          <section class="bbs_write">
            <div class="hd_titbox">
              <h2 class="h_tit1">{text.upload_post}</h2>
            </div>

            <div class="col">
              <h3 class="tit1">{text.series}</h3>
              <input type="text" name={"series"} class="inp_txt w100p" />
            </div>

            <div class="col">
              <h3 class="tit1">{text.type}</h3>
              <div class="lst_txchk">
                {
                  getTypeListElements()
                }
              </div>
            </div>

            <div class="col">
              <h3 class="tit1">{text.category}</h3>
              <Select 
                name={"category"}
                className={"select1 wid1"}
                dataList={stateCategoryList}
                handleItemClick={handleClickItemCategory} />
            </div>

            <div class="col">
              <h3 class="tit1">{text.title}</h3>
              <input type="text" class="inp_txt w100p" name={"title"} />
            </div>

            <div class="col">
              <h3 class="tit1">{text.episode}</h3>
              <input type="text" class="inp_txt w100p" name={"episode"}/>
            </div>


            <div class="col">
              <h3 class="tit1">{text.contents} <button type="button" class="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
              <ImageUploadContainer
                ref={refContents}
                id={"filebox2"}
                name={"contents"}                     
                textDragNDrop={text.drag_drop}    
                textInputMessage={text.input_image}     
                />
            </div>

            <div class="col">
              <h3 class="tit1">{text.tag}</h3>
              <div class="inp_txt sch">
                <button type="button" class="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <input type="text" class="" placeholder={text.tag_name} />
              </div>
            </div>

            <div class="col">
              <h3 class="tit1">{text.support_user}</h3>
              <Select 
                name={"supportor"}
                className={"select1 wid1"}
                dataList={stateSupportorList}
                handleItemClick={handleClickItemCategory} />
            </div>

            <div class="col">
              <h3 class="tit1">{text.timeline} <button type="button" class="btn_help" title="ヘルプ"><ToolTip title={"Contents"} text={"afasfasdfads"} /></button></h3>
              <ImageUploadContainer
                name={"timeline"}                     
                id={"filebox1"}                     
                textDragNDrop={text.drag_drop}    
                textInputMessage={text.input_image}     
                />
            </div>
          </section>

          <div class="bbs_write_botm">
            <a href="#" class="btn-pk n blue2" onClick={handleClickPreview}><span>{text.preview}</span></a>
            <a href="#series" class="btn-pk n blue" onClick={handleClickRegister}><span>{text.register}</span></a>
          </div>
          </form>

        </div>
      </div>

    </PostContainer>
  );
}


