import React, { useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCirclePlus,
  faCircleXmark,
  faPlus,
  faXmark,
} from "@fortawesome/pro-solid-svg-icons";
import Dropzone from "react-dropzone";

const Upload = () => {
  const typeList = [
    {
      code: "asset",
      name: "アセット",
    },
    {
      code: "program",
      name: "プログラム",
    },
    {
      code: "service",
      name: "サービス",
    },
  ];
  const [selectType, setSelectType] = useState("asset");
  const [files, setFiles] = useState([]);
  const handlePreviewDelete = useCallback(
    (id) => {
      setFiles(files.filter((item) => item?.id !== id));
    },
    [files]
  );
  const [product, setProduct] = useState(null);
  console.log("product : ", product);

  return (
    <div className="inr-c">
      <div className="box_area bdn">
        <form action="">
          <section className="bbs_write">
            <div className="hd_titbox">
              <h2 className="h_tit1">登録</h2>
            </div>

            <div className="col">
              <h3 className="tit1">シリーズ</h3>
              <input type="text" className="inp_txt w100p" />
            </div>

            <div className="col">
              <h3 className="tit1">タイプ</h3>
              <div className="lst_txchk">
                {typeList.map((item, index) => {
                  return (
                    <label
                      className="inp_txchk"
                      key={`type_${index}`}
                      onClick={() => setSelectType(item.code)}
                    >
                      <input
                        type="radio"
                        name="radio01"
                        checked={item.code === selectType}
                      />
                      <span>{item.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">カテゴリ</h3>
              <select name="" id="" className="select1 wid1">
                <option value="">カテゴリ</option>
              </select>
            </div>

            <div className="col">
              <h3 className="tit1">
                商品名 <span className="i_emp">*</span>
              </h3>
              <input type="text" className="inp_txt w100p" />
            </div>

            <div className="col">
              <h3 className="tit1">話</h3>
              <input type="text" className="inp_txt w100p" />
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
                  setFiles([
                    ...files,
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
                    <label for="filebox2" className="filetxt">
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
              {files?.length > 0 && (
                <div className="box_multy">
                  {files.map((item, index) => {
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

              {/*<!-- 파일 첨부 후 보여지는부분(텍스트) -->*/}
              {files?.length > 0 && (
                <div className="box_multy">
                  <div className="fileview2 scrollY">
                    その入口を通ったとき、わたしは、昔の人の住む国に逆もどりし、過ぎ去った時代の闇やみのなかに身を没してゆくような気がした。
                    　わたしはウェストミンスター・スクールの中庭から入り、低い円天井の長い廊下を通って行ったが、そこは巨大な壁にあけられた円形の穴でかすかに一部分が明るくなっているだけなので、あたかも地下に潜ったような感じがした。この暗い廊下を通して廻廊が遠くに見え、聖堂守の老人の黒い衣をまとった姿が、うす暗い円天井の下に動き、近くの墓地からぬけ出してきた幽霊のように見えた。
                    　こういう陰鬱いんうつな僧院の跡を通って寺院に近づいてゆくと、おのずから厳粛な思索にふさわしい気持ちになるものである。廻廊は昔ながらの世間を遠ざかった静寂の面影をいまだにとどめている。灰色の壁は湿気のために色があせ、歳月を経て崩れおちそうになっている。白い苔こけの衣が壁にはめこんだ記念碑の碑文をおおい、髑髏されこうべや、そのほかの葬儀の表象をもかくしている。鋭く刻んだ鑿のみのあとは、精巧な彫刻をほどこしたアーチの狭間はざま飾りからすでに消え去っている。薔薇ばらの模様がかなめ石を飾っていたが、その美しく茂った姿はなくなってしまっている。あらゆるものが、幾星霜いくせいそうのおもむろな侵蝕しんしょくのあとをとどめている。だが、そのほろびのなかにこそ、何か哀愁をそそり、また心を楽しくさせるものがあるのだ。
                    その入口を通ったとき、わたしは、昔の人の住む国に逆もどりし、過ぎ去った時代の闇やみのなかに身を没してゆくような気がした。
                    　わたしはウェストミンスター・スクールの中庭から入り、低い円天井の長い廊下を通って行ったが、そこは巨大な壁にあけられた円形の穴でかすかに一部分が明る
                    くなっているだけなので、あたかも地下に潜ったような感じがした。この暗い廊下を通して廻廊が遠くに見え、
                    聖堂守の老人の黒い衣をまとった姿が、うす暗い円天井の下に動き、近くの墓地からぬけ出してきた幽霊のように見えた。
                    　こういう陰鬱いんうつな僧院の跡を通って寺院に近づいてゆくと、おのずから厳粛な思索にふさわしい気持ちになるものである。廻廊は昔ながらの世間を遠ざかった静寂の面影をいまだにとどめている。灰色の壁は湿気のために色があせ、歳月を経て崩れおちそうになっている。白い苔こけの衣が壁にはめこんだ記念碑の碑文をおおい、
                    髑髏されこうべや、そのほかの葬儀の表象をもかくしている。鋭く刻んだ鑿のみのあとは、精巧な彫刻をほどこしたアーチの狭間はざ
                    ま飾りからすでに消え去っている。薔薇ばらの模様がかなめ石を飾っていたが、その美しく茂った姿はなくなってしまっている。あらゆるものが、幾星霜いく
                    せいそうのおもむろな侵蝕しんしょくのあとをとどめている。だが、そのほろびのなかにこそ、何か哀愁をそそり、また心を楽しくさせるものがあるのだ。
                  </div>
                </div>
              )}
            </div>

            <div className="col">
              <h3 className="tit1">
                説明 <span className="i_emp">*</span>
              </h3>
              <textarea className="textarea1"></textarea>
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
                  setProduct({
                    ...acceptedFiles[0],
                    preview: URL.createObjectURL(acceptedFiles[0]),
                  });
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="box_drag" {...getRootProps()}>
                    {(product && (
                      <div className="fileview">
                        <div>
                          <img src={product?.preview} alt="" />
                        </div>
                        <button
                          type="button"
                          className="btn_del"
                          title="削除"
                          onClick={() => setProduct(null)}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </div>
                    )) || (
                      <>
                        <input type="file" id="filebox2" {...getInputProps()} />
                        <label for="filebox2" className="filetxt">
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
              <h3 className="tit1">年齢設定</h3>
              <label className="inp_chktx">
                <input type="checkbox" checked="" />
                <span>すべての年齢</span>
              </label>
            </div>

            <div className="col">
              <h3 className="tit1">販売対象</h3>
              <div className="lst_txchk">
                <label className="inp_txchk">
                  <input type="radio" name="radio02" checked />
                  <span>すべて</span>
                </label>
                <label className="inp_txchk">
                  <input type="radio" name="radio02" />
                  <span>フォロワー</span>
                </label>
                <label className="inp_txchk">
                  <input type="radio" name="radio02" />
                  <span>個人</span>
                </label>
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">販売期限</h3>
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  販売期限を追加
                </span>
              </button>
            </div>

            <div className="col">
              <h3 className="tit1">セール設定</h3>
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  セールを追加
                </span>
              </button>
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
  );
};

export default Upload;
