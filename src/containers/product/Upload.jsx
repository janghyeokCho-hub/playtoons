import React, { useState, useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCirclePlus,
  faCircleXmark,
  faPlus,
  faXmark,
} from "@fortawesome/pro-solid-svg-icons";
import Dropzone from "react-dropzone";
import {
  getProductType as getProductTypeAPI,
  getProductCategory as getProductCategoryAPI,
  insertProduct,
} from "@API/storeService";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { showOneButtonPopup } from "@/common/common";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFileToServer, setFileMultiToServer } from "@API/dashboardService";

const Upload = () => {
  const dispatch = useDispatch();
  const authorMine = useSelector(({ post }) => post.authorMine);
  const [typeList, setTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectType, setSelectType] = useState(null);
  const targetList = [
    {
      code: "all",
      name: "すべて",
    },
    {
      code: "follower",
      name: "フォロワー",
    },
    {
      code: "individual",
      name: "個人",
    },
  ];
  const [selectTarget, setSelectTarget] = useState("all");
  const [selectAge, setSelectAge] = useState(false);
  const [products, setProducts] = useState([]);
  const handlePreviewDelete = useCallback(
    (id) => {
      setProducts(products.filter((item) => item?.id !== id));
    },
    [products]
  );
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const getProductType = useCallback(async () => {
    const response = await getProductTypeAPI();
    if (response?.status === 200) {
      setTypeList(response.data?.productTypes);
    }
  }, []);

  const getProductCategory = useCallback(async () => {
    const response = await getProductCategoryAPI(selectType?.id);
    if (response?.status === 200) {
      setCategoryList(response.data?.productCategories);
    }
  }, [selectType]);

  useEffect(() => {
    getProductType();
  }, []);

  useEffect(() => {
    if (typeList?.length && selectType === null) {
      setSelectType(typeList[0]);
    }
  }, [typeList, selectType]);

  useEffect(() => {
    if (selectType !== null) {
      getProductCategory();
    }
  }, [selectType]);

  useEffect(() => {
    if (categoryList?.length) {
      setCategory(categoryList[0]);
    }
  }, [categoryList]);

  useEffect(() => {
    if (selectAge) {
      setRating("R-18");
    } else {
      setRating("G");
    }
  }, [selectAge]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("G");
  const [saleRatio, setSaleRatio] = useState(0);
  const calendarStartRef = useRef(null);
  const calendarEndRef = useRef(null);
  const saleStartRef = useRef(null);
  const saleEndRef = useRef(null);

  const handleCategoryChange = useCallback(
    (code) => {
      const selectCategory = categoryList.find((item) => item.code === code);
      setCategory(selectCategory);
    },
    [categoryList]
  );

  const handleClickCalendar = (name, date) => {
    const startDate =
      name === "start" ? date : calendarStartRef.current.getDate();
    const endDate = name === "end" ? date : calendarEndRef.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  const handleSaleDate = (name, date) => {
    const startDate = name === "start" ? date : saleStartRef.current.getDate();
    const endDate = name === "end" ? date : saleEndRef.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  const handleSaleRatio = useCallback((value) => {
    if (value <= 100 && value >= 0) {
      setSaleRatio(value);
    } else {
      if (value > 100) {
        setSaleRatio(100);
      } else if (value < 0) {
        setSaleRatio(0);
      }
    }
  }, []);

  const handleUpload = useCallback(async () => {
    const authorId = authorMine.authors?.[0].id;
    const params = {
      name,
      thumbnailImage: "",
      description,
      authorId: authorId,
      typeId: selectType.id,
      categoryId: category.id,
      startAt: calendarStartRef.current.getDate(),
      endAt: calendarEndRef.current.getDate(),
      saleStartAt: saleStartRef.current.getDate(),
      saleEndAt: saleEndRef.current.getDate(),
      saleRatio: saleRatio,
      rating: rating,
      imageHashes: [],
    };
    console.log(params);
    insertProduct(params).then(async (response) => {
      console.log("response : ", response);
      const formData = new FormData();
      formData.append("authorId", authorId);
      formData.append("subscribeTierId", "");
      formData.append("productId", "");
      formData.append("type", "image"); //image, video, binary
      formData.append("usage", "thumbnail"); //profile, background, cover, logo, post, product, thumbnail, attachment
      formData.append("loginRequired", false); //언제 체크해서 보내는건지?
      formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
      formData.append("rating", rating); //G, PG-13, R-15, R-17, R-18, R-18G
      formData.append("file", thumbnailImage);
      const thumbnailResp = await setFileToServer(formData);
      console.log("thumbnailResp : ", thumbnailResp);
      // const productsResp = await setFileMultiToServer(products)
    });
  }, [
    name,
    category,
    selectType,
    description,
    rating,
    saleRatio,
    thumbnailImage,
    // products,
    authorMine,
    calendarStartRef,
    calendarEndRef,
  ]);

  return (
    <div className="inr-c">
      <div className="box_area bdn">
        <form action="">
          <section className="bbs_write">
            <div className="hd_titbox">
              <h2 className="h_tit1">登録</h2>
            </div>

            <div className="col">
              <h3 className="tit1">タイプ</h3>
              <div className="lst_txchk">
                {typeList.map((item, index) => {
                  return (
                    <label
                      className="inp_txchk"
                      key={`type_${index}`}
                      onClick={() => setSelectType(item)}
                    >
                      <input
                        type="radio"
                        name="radio01"
                        checked={item.code === selectType?.code}
                        readOnly
                      />
                      <span>{item.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">カテゴリ</h3>
              <select
                className="select1 wid1"
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categoryList?.map((item, index) => (
                  <option key={`category_${index}`} value={item?.code}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <h3 className="tit1">
                商品名 <span className="i_emp">*</span>
              </h3>
              <input
                type="text"
                className="inp_txt w100p"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">
                サムネイル
                <button type="button" className="btn_help" title="ヘルプ">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </h3>

              {/*<!-- 멀티드레그 -->*/}

              <Dropzone
                onDrop={(acceptedFiles) => {
                  setThumbnailImage({
                    ...acceptedFiles[0],
                    preview: URL.createObjectURL(acceptedFiles[0]),
                  });
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="box_drag" {...getRootProps()}>
                    {(thumbnailImage && (
                      <div className="fileview">
                        <div>
                          <img src={thumbnailImage?.preview} alt="" />
                        </div>
                        <button
                          type="button"
                          className="btn_del"
                          title="削除"
                          onClick={() => setThumbnailImage(null)}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </div>
                    )) || (
                      <>
                        <input type="file" id="filebox2" {...getInputProps()} />
                        <label htmlFor="filebox2" className="filetxt">
                          <div className="txt">
                            <div className="ico">
                              <FontAwesomeIcon icon={faCirclePlus} />
                            </div>
                            <p className="t">ドラッグ＆ドロップ</p>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            <div className="col">
              <h3 className="tit1">
                説明 <span className="i_emp">*</span>
              </h3>
              <textarea
                className="textarea1"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col">
              <h3 className="tit1">価格</h3>
              <div className="inp_txt sch">
                <input type="text" className="" />
                <span className="won">PC</span>
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">有料オプション</h3>
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  有料オプション追加
                </span>
              </button>
            </div>

            <div className="col">
              <h3 className="tit1">
                商品アップロード <span className="i_emp">*</span>
              </h3>

              <Dropzone
                onDrop={(acceptedFiles) => {
                  setProducts([
                    ...products,
                    ...acceptedFiles.map((file, index) => {
                      return Object.assign(file, {
                        id: `${file?.name}_${index}`,
                        preview: URL.createObjectURL(file),
                      });
                    }),
                  ]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="box_drag" {...getRootProps()}>
                    <input
                      type="file"
                      id="filebox2"
                      multiple={true}
                      {...getInputProps()}
                    />
                    <label htmlFor="filebox2" className="filetxt">
                      <div className="txt">
                        <div className="ico">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                        <p className="t">ドラッグ＆ドロップ</p>
                      </div>
                    </label>
                  </div>
                )}
              </Dropzone>

              {/*<!-- 파일 첨부 후 보여지는부분(이미지) -->*/}
              {products?.length > 0 && (
                <div className="box_multy">
                  {products.map((item, index) => {
                    return (
                      <div key={`preview_${index}`} className="fileview">
                        <div>
                          <img src={item?.preview} alt="" />
                        </div>
                        <button
                          type="button"
                          className="btn_del"
                          title="削除"
                          onClick={() => handlePreviewDelete(item?.id)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="col">
              <h3 className="tit1">年齢設定</h3>
              <label className="inp_chktx">
                <input
                  type="checkbox"
                  checked={selectAge}
                  onClick={() => setSelectAge(!selectAge)}
                  readOnly
                />
                <span>すべての年齢</span>
              </label>
            </div>

            <div className="col">
              <h3 className="tit1">販売対象</h3>
              <div className="lst_txchk">
                {targetList?.map((item, index) => {
                  return (
                    <label
                      key={`target_${index}`}
                      className="inp_txchk"
                      onClick={() => setSelectTarget(item?.code)}
                    >
                      <input
                        type="radio"
                        name="radio02"
                        checked={item?.code === selectTarget}
                        readOnly
                      />
                      <span>{item?.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">販売期限</h3>
              {/*
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  販売期限を追加
                </span>
              </button>
              */}
              <div className="inp_cal">
                <div>
                  <label htmlFor="calendar_first1">開始日</label>
                  <Calendar
                    ref={calendarStartRef}
                    name={"start"}
                    className={""}
                    type={"1month"}
                    callback={handleClickCalendar}
                  />
                </div>
                <div>
                  <label htmlFor="calendar_last1">終了日</label>
                  <Calendar
                    ref={calendarEndRef}
                    name={"end"}
                    className={""}
                    type={"none"}
                    callback={handleClickCalendar}
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">セール設定</h3>
              {/*
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  セールを追加
                </span>
              </button>
              */}
              <div className="inp_txt sch mw100">
                <input
                  type="number"
                  className="ta-c"
                  onChange={(e) => handleSaleRatio(e.target.value)}
                  value={saleRatio}
                />
                <span className="won">%</span>
              </div>
              <div className="inp_cal">
                <div>
                  <label htmlFor="calendar_first1">開始日</label>
                  <Calendar
                    ref={saleStartRef}
                    name={"start"}
                    className={""}
                    type={"1month"}
                    callback={handleSaleDate}
                  />
                </div>
                <div>
                  <label htmlFor="calendar_last1">終了日</label>
                  <Calendar
                    ref={saleEndRef}
                    name={"end"}
                    className={""}
                    type={"none"}
                    callback={handleSaleDate}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="bbs_write_botm">
            <div>
              <p className="t_info">
                当サイトでは、直近５年間の長崎県公報の
                <br className="view-m" />
                全文を掲載しています。
              </p>
            </div>
            <Link to="" className="btn-pk n blue" onClick={handleUpload}>
              <span>登録する</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
