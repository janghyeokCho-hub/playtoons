import React, { useEffect, useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/modules/redux/ducks/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCirclePlus,
  faCircleXmark,
  faMinus,
  faPlus,
  faTrashXmark,
} from "@fortawesome/pro-solid-svg-icons";
import Dropzone from "react-dropzone";
import useFilePath from "@/hook/useFilePath";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { getFileDataUrl, showOneButtonPopup } from "@/common/common";

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const currentProduct = useSelector(({ product }) => product.currentProduct);
  const productTypes = useSelector(({ product }) => product.productTypes);
  const productCategories = useSelector(
    ({ product }) => product.productCategories
  );

  const [title, setTitle] = useState(currentProduct?.name);
  const [description, setDescription] = useState(currentProduct?.description);
  const [price, setPrice] = useState(currentProduct?.price);
  const [saleRatio, setSaleRatio] = useState(currentProduct?.saleRatio * 100);
  const [selectType, setSelectType] = useState(null);
  const [category, setCategory] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const { filePath: thumbnailPreview } = useFilePath(
    currentProduct?.thumbnailImage
  );
  const [selectTarget, setSelectTarget] = useState(currentProduct?.target);
  const [selectAge, setSelectAge] = useState(false);
  const [rating, setRating] = useState(null);
  const calendarStartRef = useRef(null);
  const calendarEndRef = useRef(null);
  const saleStartRef = useRef(null);
  const saleEndRef = useRef(null);

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
      code: "indivisual",
      name: "個人",
    },
  ];

  useEffect(() => {
    if (params?.id) {
      dispatch(setProduct(params.id));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (currentProduct) {
      setSelectType(currentProduct.type);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct.rating === "R-18") {
      setSelectAge(true);
    } else {
      setSelectAge(false);
    }
  }, [currentProduct.rating]);

  useEffect(() => {
    if (selectAge) {
      setRating("R-18");
    } else {
      setRating("G");
    }
  }, [selectAge]);

  const handleCategoryChange = useCallback(
    (code) => {
      const selectCategory = productCategories.find(
        (item) => item.code === code
      );
      setCategory(selectCategory);
    },
    [productCategories]
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

  return (
    <>
      {currentProduct && (
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
                    {productTypes.map((item, index) => {
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
                    {productCategories?.map((item, index) => (
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col">
                  <h3 className="tit1">
                    サムネイル
                    <button type="button" className="btn_help" title="ヘルプ">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                  </h3>

                  {(!thumbnailImage && thumbnailPreview && (
                    <div className="box_drag">
                      <div className="fileview">
                        <div>
                          <img src={thumbnailPreview} alt="" />
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
                    </div>
                  )) || (
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        setThumbnailImage({
                          ...acceptedFiles[0],
                          file: acceptedFiles[0],
                          preview: URL.createObjectURL(acceptedFiles[0]),
                        });
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="box_drag" {...getRootProps()}>
                          {(thumbnailPreview && (
                            <div className="fileview">
                              <div>
                                <img src={thumbnailPreview} alt="" />
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
                              <input
                                type="file"
                                id="filebox2"
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
                            </>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                </div>

                <div className="col">
                  <h3 className="tit1">
                    説明 <span className="i_emp">*</span>
                  </h3>
                  <textarea
                    className="textarea1"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                  ></textarea>
                </div>

                <div className="col">
                  <h3 className="tit1">価格</h3>
                  <div className="inp_txt sch">
                    <input
                      type="text"
                      className=""
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="won">PC</span>
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">有料オプション追加</h3>

                  {/*<!-- 리스트 -->*/}
                  <ul className="lst_option_wrap1">
                    <li>
                      <div className="lst_option1">
                        <div className="first">
                          <p className="h1">オプション名</p>
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="オプション名"
                          />
                        </div>
                        <div className="fx mb0">
                          <p className="h1">オプションの内容</p>
                          <p className="h1">値段</p>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <button
                            type="button"
                            className="btn-pk gray2 n w100p"
                          >
                            <span>
                              <FontAwesomeIcon icon={faPlus} />
                            </span>
                          </button>
                        </div>
                      </div>

                      <button type="button" className="btn_option">
                        <span>
                          <FontAwesomeIcon icon={faTrashXmark} />
                          オプション削除
                        </span>
                      </button>
                    </li>
                    <li>
                      <div className="lst_option1">
                        <div className="first">
                          <p className="h1">オプション名</p>
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="オプション名"
                          />
                        </div>
                        <div className="fx mb0">
                          <p className="h1">オプションの内容</p>
                          <p className="h1">値段</p>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <button
                            type="button"
                            className="btn-pk gray2 n w100p"
                          >
                            <span>
                              <FontAwesomeIcon icon={faPlus} />
                            </span>
                          </button>
                        </div>
                      </div>

                      <button type="button" className="btn_option">
                        <span>
                          <FontAwesomeIcon icon={faTrashXmark} />
                          オプション削除
                        </span>
                      </button>
                    </li>
                  </ul>

                  <button type="button" className="btn-pk n blue2 options">
                    <span>
                      <FontAwesomeIcon icon={faPlus} />
                      有料オプション追加
                    </span>
                  </button>
                </div>

                <div className="col">
                  <h3 className="tit1">
                    商品アップロード <span className="i_emp">*</span>
                  </h3>
                  <div className="box_drag">
                    <input type="file" id="filebox1" />
                    <label htmlFor="filebox1" className="filetxt">
                      <div className="txt">
                        <div className="ico">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                        <p className="t">ドラッグ＆ドロップ</p>
                      </div>
                    </label>
                  </div>
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
                  <div className="inp_cal">
                    <div>
                      <label htmlFor="calendar_first1">開始日</label>
                      <Calendar
                        ref={calendarStartRef}
                        name={"start"}
                        callback={handleClickCalendar}
                        type="none"
                        value={new Date(currentProduct?.startAt) || null}
                      />
                    </div>
                    <div>
                      <label htmlFor="calendar_last1">終了日</label>
                      <Calendar
                        ref={calendarEndRef}
                        name={"end"}
                        callback={handleClickCalendar}
                        type="none"
                        value={new Date(currentProduct?.endAt) || null}
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">セール設定</h3>

                  <div className="inp_txt sch mw100">
                    <input
                      type="number"
                      className="ta-c"
                      value={saleRatio}
                      onChange={(e) => handleSaleRatio(e.target.value)}
                    />
                    <span className="won">%</span>
                  </div>
                  <div className="inp_cal">
                    <div>
                      <label htmlFor="calendar_first1">開始日</label>
                      <Calendar
                        ref={saleStartRef}
                        name={"start"}
                        callback={handleSaleDate}
                        type="none"
                        value={new Date(currentProduct?.saleStartAt) || null}
                      />
                    </div>
                    <div>
                      <label htmlFor="calendar_last1">終了日</label>
                      <Calendar
                        ref={saleEndRef}
                        name={"end"}
                        callback={handleSaleDate}
                        type="none"
                        value={new Date(currentProduct?.saleEndAt) || null}
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

                <a href="#" className="btn-pk n blue">
                  <span>登録する</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
